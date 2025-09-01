'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { NoteSchema } from '@/types/note';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  initialData?: NoteSchema;
}

const NoteForm = ({ initialData }: NoteFormProps) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [formData, setFormData] = useState<NoteSchema>({
    title: '',
    content: '',
    tag: 'Todo',
    ...initialData,
  });

  useEffect(() => {
    
    if (draft.title || draft.content || draft.tag !== 'Todo') {
      setFormData(draft);
    }
  }, [draft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setDraft(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNote(formData);
      clearDraft();
      router.push('/notes');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
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
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.button}
        >
          Save
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
