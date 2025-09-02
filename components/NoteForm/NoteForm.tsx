'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { NoteSchema, NoteTag } from '@/types/note';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import toast from 'react-hot-toast';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  initialData?: NoteSchema;
}

const NoteForm = ({ initialData }: NoteFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [formData, setFormData] = useState<NoteSchema>({
    title: '',
    content: '',
    tag: 'Todo',
    ...initialData,
  });

  useEffect(() => {
    if (draft.title || draft.content || (draft.tag && draft.tag !== 'Todo')) {
      setFormData(draft);
    }
  }, [draft]);

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes');
      toast.success('Note created successfully!');
    },
    onError: () => {
      toast.error('Failed to create note.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value as NoteTag };
    setFormData(updatedData);
    setDraft(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNoteMutation.mutate(formData);
  };

  const handleCancel = () => {
    router.push('/notes');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          placeholder="Note title"
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
          rows={5}
          placeholder="Note content"
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.button}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={`${css.button} ${css.buttonCancel}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
