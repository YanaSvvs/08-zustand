import { FormValues, Note, NoteTag } from '@/types/note';
import axios from 'axios';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const getTags = async (): Promise<NoteTag[]> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };

  const response = await axios.get<NoteTag[]>(
    'https://notehub-public.goit.study/api/tags',
    { headers }
  );

  return response.data;
};

export const getNotes = async (
  tag: NoteTag | 'all',
  sort: 'asc' | 'desc',
  search: string,
  page: number
): Promise<NotesHttpResponse> => {
  const params: {
    search?: string;
    tag?: string;
    page: number;
    perPage: number;
    sort?: 'asc' | 'desc';
  } = {
    page,
    perPage: 12,
  };

  if (search && search.trim() !== '') {
    params.search = search;
  }

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  if (sort) {
    params.sort = sort;
  }

  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };

  const response = await axios.get<NotesHttpResponse>(
    'https://notehub-public.goit.study/api/notes',
    { params, headers }
  );

  return response.data;
};

export const createNote = async (note: FormValues): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    { headers }
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    { headers }
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    { headers }
  );
  return response.data;
};
