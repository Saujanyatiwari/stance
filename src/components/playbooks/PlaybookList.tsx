import { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Playbook } from '../../types';

interface PlaybookListProps {
  onClose: () => void;
  onLoad: () => void;
  onEdit: (playbook: Playbook) => void;
  onCreate: () => void;
}

export function PlaybookList({ onClose, onLoad, onEdit, onCreate }: PlaybookListProps) {
  const { allPlaybooks, canAddPlaybook, loadPlaybook, deletePlaybook } = useApp();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const builtIns = allPlaybooks.filter((p) => p.isBuiltIn);
  const custom = allPlaybooks.filter((p) => !p.isBuiltIn);

  const handleRowClick = (id: string) => {
    loadPlaybook(id);
    onLoad();
  };

  const handleDeleteConfirm = (id: string) => {
    deletePlaybook(id);
    setDeletingId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a] shrink-0">
        <span className="text-[13px] font-semibold text-[#f2f2f2]">Playbooks</span>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded text-[#555555] hover:text-[#aaaaaa] hover:bg-[#1a1a1a] transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[340px] overflow-y-auto">
        {/* Built-ins */}
        {builtIns.map((pb) => (
          <button
            key={pb.id}
            type="button"
            onClick={() => handleRowClick(pb.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#161616] transition-colors group"
          >
            <span className="text-[13px] text-[#aaaaaa] group-hover:text-[#f2f2f2] transition-colors flex-1 truncate pr-3">
              {pb.name}
            </span>
            <span className="text-[10px] text-[#3a3a3a] bg-[#181818] border border-[#222222] px-1.5 py-0.5 rounded-[4px] shrink-0 leading-none">
              Built-in
            </span>
          </button>
        ))}

        {/* Divider between built-ins and custom */}
        {custom.length > 0 && (
          <div className="h-px bg-[#1a1a1a] mx-4 my-1" />
        )}

        {/* Custom playbooks */}
        {custom.map((pb) => (
          <div key={pb.id}>
            {deletingId === pb.id ? (
              <div className="px-4 py-3 bg-[rgba(232,56,42,0.04)] border-l-2 border-[#e8382a]">
                <p className="text-[12px] text-[#888888] mb-2.5">
                  Delete <span className="text-[#cccccc]">"{pb.name}"</span>?
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDeleteConfirm(pb.id)}
                    className="text-[12px] font-semibold text-white bg-[#e8382a] hover:bg-[#c5251a] px-3 py-1 rounded-[5px] transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(null)}
                    className="text-[12px] text-[#555555] hover:text-[#888888] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4 py-3 hover:bg-[#161616] transition-colors group">
                <button
                  type="button"
                  onClick={() => handleRowClick(pb.id)}
                  className="flex-1 text-left text-[13px] text-[#aaaaaa] group-hover:text-[#f2f2f2] transition-colors truncate min-w-0"
                >
                  {pb.name}
                </button>
                <div className="flex items-center gap-0.5 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(pb); }}
                    className="w-6 h-6 flex items-center justify-center rounded text-[#444444] hover:text-[#888888] hover:bg-[#222222] transition-colors"
                    aria-label="Edit playbook"
                  >
                    <Pencil size={11} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDeletingId(pb.id); }}
                    className="w-6 h-6 flex items-center justify-center rounded text-[#444444] hover:text-[#e8382a] hover:bg-[rgba(232,56,42,0.08)] transition-colors"
                    aria-label="Delete playbook"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty custom state */}
        {custom.length === 0 && (
          <div className="px-4 py-3 border-t border-[#141414]">
            <p className="text-[11px] text-[#2e2e2e] text-center py-1">No custom playbooks yet</p>
          </div>
        )}
      </div>

      {/* Footer: Create button */}
      <div className="border-t border-[#1a1a1a] p-3">
        <button
          type="button"
          onClick={canAddPlaybook ? onCreate : undefined}
          disabled={!canAddPlaybook}
          title={!canAddPlaybook ? 'Free limit reached — 3 custom playbooks maximum.' : undefined}
          className={`w-full text-center py-2 rounded-[7px] text-[13px] font-medium transition-colors ${
            canAddPlaybook
              ? 'text-[#e8382a] hover:bg-[rgba(232,56,42,0.06)] hover:text-[#ff4d3d]'
              : 'text-[#2e2e2e] cursor-not-allowed'
          }`}
        >
          + Create new playbook
        </button>
      </div>
    </div>
  );
}
