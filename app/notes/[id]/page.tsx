import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: 'Note Not Found',
      description: 'The note you are looking for does not exist.',
    };
  }

  return {
    title: `NoteHub - ${note.title}`,
    description: note.content.substring(0, 150) + '...',
    openGraph: {
      title: `NoteHub - ${note.title}`,
      description: note.content.substring(0, 150) + '...',
      url: `https://notehub.vercel.app/notes/${note.id}`, // Замініть на ваш URL-адресу
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
