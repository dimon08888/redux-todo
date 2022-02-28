import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from './store';
import { todoAdd } from './todosSlice';

export function Header() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const trimmedText = e.currentTarget.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      dispatch(todoAdd(trimmedText));
      setText('');
    }
  }

  return (
    <header>
      <input
        className="w-full px-10 py-3 outline-none text-lg"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={e => setText(e.target.value)}
        value={text}
        placeholder="What needs to be done?"
      />
    </header>
  );
}
