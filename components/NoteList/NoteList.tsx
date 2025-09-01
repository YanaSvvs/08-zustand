import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

import toast from 'react-hot-toast';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`Note "${data.title}" deleted.`);
    },
    onError: () => {
      toast.error(`Failed to delete note.`);
    },
  });

  const handleClickDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ title, tag, id, content }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link className={css.link} href={`/notes/${id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => {
                handleClickDelete(id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}