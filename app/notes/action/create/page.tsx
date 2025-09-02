import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './create.module.css';

export const metadata: Metadata = {
  title: 'NoteHub - Create Note',
  description: 'Create a new note in your collection.',
  openGraph: {
    title: 'NoteHub - Create Note',
    description: 'Create a new note in your collection.',
    url: 'https://notehub.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}