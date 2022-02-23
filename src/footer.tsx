import React from 'react';
import { StatusFilter } from './types';
import { capitalize } from './utils';
import { AVAILABLE_COLORS } from './colors';

export function Footer() {
  const colors = ['blue'];
  const status = StatusFilter.ALL;
  const todosRemaining = 1;

  return (
    <footer>
      <div>
        <h5>Actions</h5>
        <button>Mark All Completed</button>
        <button>Clear Complited</button>
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
      <h5>Remaining Todos</h5>
      <b>{count}</b> item{suffix} left
    </div>
  );
}

function StatusFilterForm({ status }: { status: StatusFilter }) {
  function onStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked, e.target.value);
  }

  return (
    <div>
      <h5>Filter by status</h5>
      <form>
        {Object.entries(StatusFilter).map(([key, value]) => (
          <label key={key}>
            <input
              type="radio"
              value={value}
              name="status"
              checked={status === value}
              onChange={onStatusChange}
            />
            {capitalize(value)}
          </label>
        ))}
      </form>
    </div>
  );
}

function ColorFilterForm({ colors }: { colors: string[] }) {
  return (
    <div>
      <h5>Filter by Color</h5>
      <form>
        {AVAILABLE_COLORS.map(color => (
          <label>
            <input type="checkbox" checked={colors.includes(color)} />
            {capitalize(color)}
            <span
              className="w-5 h-3 inline-block rounded mx-1"
              style={{ backgroundColor: color }}
            ></span>
          </label>
        ))}
      </form>
    </div>
  );
}
