import React from 'react';
import { AVAILABLE_COLORS } from './colors';
import type { Todo } from './types';

export function TodoList() {
  const items: Todo[] = [
    {
      id: '1',
      text: 'Learn React',
      completed: true,
    },
    {
      id: '2',
      text: 'Learn Redux',
      completed: false,
      color: 'purple',
    },
    {
      id: '3',
      text: 'Build something fun',
      completed: false,
      color: 'blue',
    },
  ];

  const renderedItems = items.map(todo => <TodoItem todo={todo} key={todo.id} />);

  return <ul>{renderedItems}</ul>;
}

function TodoItem({ todo }: { todo: Todo }) {
  function onCompletedChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('Completed change -> ', e.target.checked);
  }

  function onColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log('Color change -> ', e.target.value);
  }

  return (
    <li className="">
      <input type="checkbox" checked={todo.completed} onChange={onCompletedChange} />
      {todo.text}
      <select
        className="font-semibold"
        style={{ color: todo.color }}
        value={todo.color}
        onChange={onColorChange}
      >
        <option value=""></option>
        {AVAILABLE_COLORS.map(color => (
          <option key={color} style={{ color }} value={color}>
            {color}
          </option>
        ))}
      </select>
    </li>
  );
}
