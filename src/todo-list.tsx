import React from 'react';
import { AVAILABLE_COLORS } from './colors';
import type { Todo } from './types';
import { useAppSelector, useAppDispatch } from './store';

export function TodoList() {
  const items = useAppSelector(state => state.todos);

  const renderedItems = items.map(todo => <TodoItem todo={todo} key={todo.id} />);

  return <ul>{renderedItems}</ul>;
}

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();

  function onCompletedChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'todos/toggle', payload: todo.id });
  }

  function onColorSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: 'todos/colorSelect',
      payload: { todoId: todo.id, color: e.target.value },
    });
  }

  function onDelete() {
    dispatch({ type: 'todos/delete', payload: todo.id });
  }

  return (
    <li className="border-t-2 border-slate-300 py-2 px-2 flex items-center">
      <div>
        <input
          className="mr-2"
          type="checkbox"
          checked={todo.completed}
          onChange={onCompletedChange}
        />
        {todo.text}
      </div>

      <div className="ml-auto">
        <select
          className="font-bold rounded border-2 border-solid border-gray-400 cursor-pointer mr-2 capitalize"
          style={{ color: todo.color }}
          value={todo.color}
          onChange={onColorSelect}
        >
          <option value=""></option>
          {AVAILABLE_COLORS.map(color => (
            <option className="font-bold" key={color} style={{ color }} value={color}>
              {color}
            </option>
          ))}
        </select>

        <button
          onClick={onDelete}
          className="px-1 font-semibold text-red-300 hover:text-red-500"
        >
          X
        </button>
      </div>
    </li>
  );
}
