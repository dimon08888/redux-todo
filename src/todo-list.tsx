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
    <li className=" border-t-2 border-slate-300 py-2 px-2">
      <input type="checkbox" checked={todo.completed} onChange={onCompletedChange} />
      <div className="px-2 w-10/12 inline-block">{todo.text}</div>
      <div className="inline-block">
        <select
          className="font-semibold rounded border-2 border-solid border-gray-400 cursor-pointer "
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
        <button className="px-1 font-semibold text-red-300 hover:text-red-500">X</button>
      </div>
    </li>
  );
}
