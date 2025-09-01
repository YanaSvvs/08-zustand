import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface NotesPageProps {
  params: {
    slug: string[]; 
  };
  searchParams?: { [key: string]: string | string[] | undefined }; 
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
