'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Loader } from '@/components/Loader/Loader';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { ErrorMessageEmpty } from '@/components/ErrorMessageEmpty/ErrorMessageEmpty';
import { NoteList } from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';

import { getNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import { NoteTag } from '@/types/note';

interface NotesClientProps {
  initialTag: NoteTag | 'all';
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, initialTag],
    queryFn: () => getNotes(initialTag, 'desc', searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];
  
  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox
              value={searchQuery}
              onChange={(e) => debouncedSetSearchQuery(e.target.value)}
            />
            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          </header>

          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {isSuccess && notes.length === 0 && <ErrorMessageEmpty />}
          {notes.length > 0 && <NoteList notes={notes} />}
          {isSuccess && totalPages > 1 && (
            <Pagination
              page={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          )}
        </section>
      </main>
    </div>
  );
}