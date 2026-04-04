'use client';
import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChangeText: (text: string) => void;
}

export default function SearchBox({ onChangeText }: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    setSearchText(text);
    onChangeText(text.trim());
  };

  return (
    <input
      className={css.input}
      type="text"
      onChange={handleChange}
      value={searchText}
      placeholder="Search notes"
    />
  );
}
