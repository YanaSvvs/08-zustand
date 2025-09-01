import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';

interface NotesPageProps {
  params: {
    slug: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const tag = params.slug?.[0] || 'all';

  return {
    title: `NoteHub - Notes filtered by ${tag}`,
    description: `Browse notes related to the ${tag} tag.`,
    openGraph: {
      title: `NoteHub - Notes filtered by ${tag}`,
      description: `Browse notes related to the ${tag} tag.`,
      url: `https://notehub.vercel.app/notes/filter/${tag}`, 
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0] || 'all';
  const queryKey = ['notes', '', 1, tag];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes('', 1, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
