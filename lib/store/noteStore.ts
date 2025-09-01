import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteSchema } from '@/types/note';

const initialDraft: NoteSchema = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: NoteSchema;
  setDraft: (note: NoteSchema) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: { ...note } }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);
