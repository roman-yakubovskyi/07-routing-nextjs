'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './Notes.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

const NotesClient = () => {
  const [query, setQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: dataNotes } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: async () => {
      const { notes, totalPages } = await fetchNotes(query, page);
      setTotalPages(totalPages);
      return notes;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (dataNotes && dataNotes.length === 0) {
      toast.error('No notes found for your request');
    }
  }, [dataNotes]);

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
      {dataNotes && dataNotes.length > 0 && (
        <NoteList notes={dataNotes} currentQuery={query} />
      )}
      <Toaster />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} currentQuery={query} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
