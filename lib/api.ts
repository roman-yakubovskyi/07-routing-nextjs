import axios from 'axios';
import type { Note, NoteFormValues } from '@/types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const myAuthorization = 'Bearer ' + myKey;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = myAuthorization;

export type NoteTag = 'all' | 'work' | 'personal' | 'todo';

interface GetNotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

type GetNotesByIdHttpResponse = Note;
type DeleteNotesHttpResponse = Note;
type PostNotesHttpResponse = Note;

export async function fetchNotes({
  search = '',
  page = 1,
  tag = 'all',
}: {
  search?: string;
  page?: number;
  tag?: NoteTag;
}): Promise<GetNotesHttpResponse> {
  const params = {
    search,
    page,
    perPage: 12,
    ...(tag !== 'all' && { tag }),
  };

  const response = await axios.get<GetNotesHttpResponse>('/notes', {
    params,
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

export async function fetchNoteById(
  noteId: string
): Promise<GetNotesByIdHttpResponse> {
  if (!noteId) {
    throw new Error('Note ID is required to fetch note');
  }

  const response = await axios.get<GetNotesByIdHttpResponse>(
    `/notes/${noteId}`
  );

  return response.data;
}

export async function deleteNote(
  noteId: string
): Promise<DeleteNotesHttpResponse> {
  if (!noteId) {
    throw new Error('Note ID is required for deletion');
  }

  const response = await axios.delete<DeleteNotesHttpResponse>(
    `/notes/${noteId}`
  );

  return response.data;
}

export async function createNote(
  noteCreate: NoteFormValues
): Promise<PostNotesHttpResponse> {
  const response = await axios.post<PostNotesHttpResponse>(
    '/notes',
    noteCreate
  );

  return response.data;
}
