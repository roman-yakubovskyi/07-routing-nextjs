import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page of my app',
};

const Notes = async () => {
  const query = '';
  const page = 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
