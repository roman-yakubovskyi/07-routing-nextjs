'use client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './Notes.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotesByTag } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

interface NotePageProps {
  tag: string;
}
const NotesPage = ({ tag }: NotePageProps) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    return () => {};
  }, []);
  const { data } = useQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: async () => fetchNotesByTag(query, tag, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];
  useEffect(() => {
    if (data && data.notes && data.notes.length === 0) {
      toast.error('No notes found for your request');
    }
  }, [data]);

  const handleSearch = useDebouncedCallback((text: string) => {
    setPage(1);
    setQuery(text);
  }, 1000);
  useEffect(() => {}, [query]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChangeText={handleSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      {notes && notes.length > 0 && (
        <NoteList notes={notes} currentQuery={query} currentTag={tag} />
      )}
      <Toaster />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onClose={closeModal}
            currentQuery={query}
            currentTag={tag}
          />
        </Modal>
      )}
    </div>
  );
};

export default NotesPage;
