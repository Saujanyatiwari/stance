import { useRef, useEffect, useState } from 'react';
import type { Playbook } from '../../types';
import { useApp } from '../../context/AppContext';
import { PlaybookList } from './PlaybookList';
import { PlaybookForm } from './PlaybookForm';
import type { PlaybookFormData } from './PlaybookForm';

type View = 'list' | { type: 'create' } | { type: 'edit'; playbook: Playbook };

interface PlaybooksDropdownProps {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  top: number;
  right: number;
  onClose: () => void;
}

export function PlaybooksDropdown({ triggerRef, top, right, onClose }: PlaybooksDropdownProps) {
  const { addPlaybook, updatePlaybook } = useApp();
  const [view, setView] = useState<View>('list');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      const outsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
      const outsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
      if (outsideDropdown && outsideTrigger) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, triggerRef]);

  const handleSaveCreate = (data: PlaybookFormData) => {
    addPlaybook(data);
    setView('list');
  };

  const handleSaveEdit = (id: string, data: PlaybookFormData) => {
    updatePlaybook(id, data);
    setView('list');
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top,
        right,
        width: 320,
        zIndex: 9999,
        boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
      }}
      className="bg-[#111111] border border-[#1e1e1e] rounded-[12px] overflow-hidden"
    >
      {view === 'list' && (
        <PlaybookList
          onClose={onClose}
          onLoad={onClose}
          onEdit={(pb) => setView({ type: 'edit', playbook: pb })}
          onCreate={() => setView({ type: 'create' })}
        />
      )}

      {typeof view === 'object' && view.type === 'create' && (
        <PlaybookForm
          onSave={handleSaveCreate}
          onCancel={() => setView('list')}
        />
      )}

      {typeof view === 'object' && view.type === 'edit' && (
        <PlaybookForm
          playbook={view.playbook}
          onSave={(data) => handleSaveEdit(view.playbook.id, data)}
          onCancel={() => setView('list')}
        />
      )}
    </div>
  );
}
