import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import NotesPage from './Notes.client';
import { fetchNotes, type NoteTag } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Notes',
};

type Props = {
  params: Promise<{ slug: string[] }>;
};

function isValidTag(tag: string): tag is NoteTag {
  return ['all', 'work', 'personal', 'todo'].includes(tag);
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;

  const rawTag = slug[0];
  const tag: NoteTag = isValidTag(rawTag) ? rawTag : 'all';

  const query = '';
  const page = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: () =>
      fetchNotes({
        search: query,
        tag,
        page,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
