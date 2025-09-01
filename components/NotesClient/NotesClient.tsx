'use client';

import { useNotes } from '@/hooks';
import Notes from '../Notes/Notes';
import NoteList from '../NoteList/NoteList';
import css from './NotesClient.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '@/lib/api';
import Link from 'next/link';

interface NotesClientProps {
  initialTag?: string;
}

const NotesClient = ({ initialTag = 'all' }: NotesClientProps) => {
  const [activeTag, setActiveTag] = useState(initialTag);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });

  const { notes, totalPages, notesCount } = useNotes({
    search,
    page,
    tag: activeTag,
    sortOrder,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
  };

  const handleSort = (sort: 'asc' | 'desc') => {
    setSortOrder(sort);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const isShowNotes = notes && notes.length > 0;

  return (
    <>
      <Notes
        searchQuery={search}
        onSearch={handleSearch}
        onSort={handleSort}
        notesCount={notesCount}
        sortOrder={sortOrder}
      />

      <div className={css.content}>
        <div className={css.sidebar}>
          <div className={css.titleWrapper}>
            <h2 className={css.title}>My notes</h2>
            <Link href="/notes/action/create" className={css.createBtn}>
              <span className={css.createIcon}>+</span>Create note
            </Link>
          </div>
          <NoteList
            tags={tags || []}
            notes={notes}
            activeTag={activeTag}
            onTagChange={handleTagChange}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isShowNotes && (
          <div className={css.notesGrid}>
            {notes.map(({ title, content, id }) => (
              <Notes
                key={id}
                noteId={id}
                title={title}
                text={content}
              />
            ))}
          </div>
        )}
        {!isShowNotes && (
          <p className={css.emptyText}>
            You don't have any notes.
          </p>
        )}
      </div>
    </>
  );
};

export default NotesClient;
