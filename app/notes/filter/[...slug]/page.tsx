import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesPage from './Notes.client';
import { fetchNotesByTag } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Notes',
};

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? 'all' : slug[0];

  const query = '';
  const page = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: () => fetchNotesByTag(query, tag, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
