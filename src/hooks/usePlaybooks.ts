import { useState, useCallback } from 'react';
import type { Playbook } from '../types';
import { BUILT_IN_PLAYBOOKS } from '../types';

const MAX_CUSTOM = 3;
const STORAGE_KEY = 'stance_playbooks';

function loadCustom(): Playbook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw) as Playbook[];
    return items.map((item) => ({ ...item, role: item.role ?? '' }));
  } catch {
    return [];
  }
}

function saveCustom(playbooks: Playbook[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playbooks));
  } catch {}
}

export function usePlaybooks() {
  const [custom, setCustom] = useState<Playbook[]>(loadCustom);

  const allPlaybooks = [...BUILT_IN_PLAYBOOKS, ...custom];
  const customCount = custom.length;
  const canAdd = customCount < MAX_CUSTOM;

  const addPlaybook = useCallback((data: Omit<Playbook, 'id' | 'createdAt' | 'isBuiltIn'>) => {
    const newPlaybook: Playbook = {
      ...data,
      id: `custom-${Date.now()}`,
      isBuiltIn: false,
      createdAt: Date.now(),
    };
    setCustom((prev) => {
      const updated = [...prev, newPlaybook];
      saveCustom(updated);
      return updated;
    });
    return newPlaybook;
  }, []);

  const updatePlaybook = useCallback((id: string, data: Omit<Playbook, 'id' | 'createdAt' | 'isBuiltIn'>) => {
    setCustom((prev) => {
      const updated = prev.map((p) => p.id === id ? { ...p, ...data } : p);
      saveCustom(updated);
      return updated;
    });
  }, []);

  const deletePlaybook = useCallback((id: string) => {
    setCustom((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveCustom(updated);
      return updated;
    });
  }, []);

  return {
    allPlaybooks,
    customCount,
    canAdd,
    addPlaybook,
    updatePlaybook,
    deletePlaybook,
  };
}
