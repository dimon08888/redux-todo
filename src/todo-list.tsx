import React from 'react';
import { AVAILABLE_COLORS } from './colors';
import { StatusFilter, Todo } from './types';
import { useAppSelector, useAppDispatch } from './store';
import { todoColorSelect, todoDelete, todoToggle } from './todosSlice';

export function TodoList() {
  const todos = useAppSelector(state => {
    const { status, colors } = state.filters;

    if (status === StatusFilter.ALL && colors.length === 0) {
      return state.todos;
    }

    const completedStatus = status === StatusFilter.COMPLETED;

    return state.todos.filter(todo => {
      const statusMatches =
        status === StatusFilter.ALL || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color as string);
      return statusMatches && colorMatches;
    });
  });

  const renderedItems = todos.map(todo => <TodoItem todo={todo} key={todo.id} />);

  return <ul>{renderedItems}</ul>;
}

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();

  return (
    <li className="border-t-2 border-slate-300 py-2 px-2 flex items-center">
      <div>
        <input
          className="mr-2"
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(todoToggle(todo.id))}
        />
        {todo.text}
      </div>

      <div className="ml-auto">
        <select
          className="font-bold rounded border-2 border-solid border-gray-400 cursor-pointer mr-2 capitalize"
          style={{ color: todo.color }}
          value={todo.color}
          onChange={e => dispatch(todoColorSelect(todo.id, e.target.value))}
        >
          <option value=""></option>
          {AVAILABLE_COLORS.map(color => (
            <option className="font-bold" key={color} style={{ color }} value={color}>
              {color}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(todoDelete(todo.id))}
          className="px-1 font-semibold text-red-300 hover:text-red-500"
        >
          X
        </button>
      </div>
    </li>
  );
}
