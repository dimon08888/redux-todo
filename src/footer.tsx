import React from 'react';
import { StatusFilter } from './types';
import { capitalize } from './utils';
import { AVAILABLE_COLORS } from './colors';
import { useAppSelector, useAppDispatch } from './store';
import { todoCompleteAll, todoClearCompleted, selectTodos } from './todosSlice';
import { statusFilterChange, colorFilterChange } from './filtersSlice';

export function Footer() {
  const dispatch = useAppDispatch();
  const { status, colors } = useAppSelector(state => state.filters);
  const todosRemaining = useAppSelector(
    state => selectTodos(state).filter(todo => !todo.completed).length,
  );

  return (
    <footer className="pt-2 flex flex-row mt-10 space-x-7 border-t-2 border-slate-300">
      <div className="text-center px-3">
        <h5 className="font-bold">Actions</h5>
        <button
          onClick={() => dispatch(todoCompleteAll())}
          className="font-bold text-white w-full px-5 py-1 block mt-3 bg-sky-500 rounded-md hover:bg-sky-600"
        >
          Mark All Completed
        </button>
        <button
          onClick={() => dispatch(todoClearCompleted())}
          className="font-bold text-white w-full px-5 py-1 mt-2 bg-sky-500 rounded-md hover:bg-sky-600"
        >
          Clear Completed
        </button>
      </div>
      <RemainingTodos count={todosRemaining} />
      <StatusFilterForm status={status} />
      <ColorFilterForm colors={colors} />
    </footer>
  );
}

function RemainingTodos({ count }: { count: number }) {
  const suffix = count === 1 ? '' : 's';
  return (
    <div>
      <h5 className="font-bold">Remaining Todos</h5>
      <b>{count}</b> item{suffix} left
    </div>
  );
}

function StatusFilterForm({ status }: { status: StatusFilter }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h5 className="font-bold">Filter by Status</h5>
      <form className="flex flex-col">
        {Object.entries(StatusFilter).map(([key, value]) => (
          <label key={key} className="capitalize">
            <input
              className="mr-1"
              type="radio"
              value={value}
              name="status"
              checked={status === value}
              onChange={() => dispatch(statusFilterChange(value))}
            />
            {value}
          </label>
        ))}
      </form>
    </div>
  );
}

function ColorFilterForm({ colors }: { colors: string[] }) {
  const dispatch = useAppDispatch();

  function onColorChange(e: React.ChangeEvent<HTMLInputElement>, color: string) {
    const changeType = e.target.checked ? 'add' : 'remove';
    dispatch(colorFilterChange(color, changeType));
  }

  return (
    <div>
      <h5 className="font-bold">Filter by Color</h5>
      <form className=" flex flex-col text-left">
        {AVAILABLE_COLORS.map(color => (
          <label key={color}>
            <input
              type="checkbox"
              checked={colors.includes(color)}
              onChange={e => onColorChange(e, color)}
            />
            <span
              className="w-5 h-3 inline-block rounded mx-1"
              style={{ backgroundColor: color }}
            ></span>
            {capitalize(color)}
          </label>
        ))}
      </form>
    </div>
  );
}
