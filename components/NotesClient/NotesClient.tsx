'use client';

import { NoteList } from '@/components/NoteList/NoteList';
import css from './NotesClient.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNotes, getTags } from '@/lib/api';
import { useState } from 'react';
import { NoteTag } from '@/types/note';
import TagMenu from '@/components/TagsMenu/TagsMenu';
import Link from 'next/link';

interface NotesClientProps {
  initialTag?: NoteTag | 'all';
}

const NotesClient: React.FC<NotesClientProps> = ({ initialTag = 'all' }) => {
  const [activeTag, setActiveTag] = useState<NoteTag | 'all'>(initialTag);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const { data: tags, isPending: isTagsPending, error: tagsError } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  const {
    data: notes,
    isPending: isNotesPending,
    error: notesError,
  } = useQuery({
    queryKey: ['notes', activeTag, sortOrder, search, page],
    queryFn: () => getNotes(activeTag, sortOrder, search, page),
  });

  if (isTagsPending || isNotesPending) {
    return <div>Loading...</div>;
  }

  if (tagsError || notesError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className={css.content}>
      <header className={css.header}>
        <div className={css.actions}>
          <Link className={css.addButton} href="/notes/action/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Note
          </Link>
          <div className={css.controls}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={css.searchInput}
            />
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'asc' | 'desc')
              }
              className={css.select}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
        <TagMenu
          tags={tags}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
        />
      </header>
      {notes.notes.length > 0 ? (
  <NoteList notes={notes.notes} />
) : (
  <div className={css.emptyState}>No notes found.</div>
)}
    </div>
  );
};

export default NotesClient;
