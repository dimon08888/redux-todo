import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from './store';
import { createTodo, todoAdd } from './todosSlice';

export function Header() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const [status, setStatus] = React.useState<'idle' | 'loading'>('idle');

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const trimmedText = e.currentTarget.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      setStatus('loading');
      await dispatch(createTodo(trimmedText) as any);
      setStatus('idle');
      setText('');
    }
  }

  const isLoading = status === 'loading';

  return (
    <header className="flex items-center">
      <input
        className="flex-grow px-10 py-3 outline-none text-lg"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={e => setText(e.target.value)}
        value={text}
        placeholder={isLoading ? '' : 'What needs to be done?'}
        disabled={isLoading}
      />
      {isLoading ? <span>Loading...</span> : null}
    </header>
  );
}
