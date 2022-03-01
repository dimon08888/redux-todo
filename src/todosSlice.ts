import { stat } from 'fs';
import store, { RootState } from './store';
import { Todo } from './types';

// const todos = [
//   { id: 2, text: 'Buy milk', completed: false },
//   { id: 7, text: 'Clean room', completed: true }
// ]

// const todosNormalized: Record<string, Todo> = {
//   '2': { id: '2', text: 'Buy milk', completed: false },
//   '7': { id: '7', text: 'Clean room', completed: false },
// };

type TodosState = {
  status: 'idle' | 'loading';
  entities: Record<string, Todo>;
};

const initialState: TodosState = {
  status: 'idle',
  entities: {},
};

type TodosAction =
  | { type: 'todos/add'; payload: Todo }
  | { type: 'todos/toggle'; payload: string }
  | { type: 'todos/delete'; payload: string }
  | { type: 'todos/colorSelect'; payload: { todoId: string; color: string } }
  | { type: 'todos/completeAll' }
  | { type: 'todos/clearCompleted' }
  | { type: 'todos/loading' }
  | { type: 'todos/load'; payload: Todo[] };

export default function todosReducer(
  state = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case 'todos/add': {
      const todo = action.payload;
      return {
        ...state,
        entities: { ...state.entities, [todo.id]: todo },
      };
    }
    case 'todos/toggle': {
      const todo = state.entities[action.payload];
      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: { ...todo, completed: !todo.completed },
        },
      };
    }
    case 'todos/delete': {
      const newEntities = { ...state.entities };
      delete newEntities[action.payload];
      return { ...state, entities: newEntities };
    }
    case 'todos/colorSelect': {
      const { todoId, color } = action.payload;
      const todo = state.entities[todoId];
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: { ...todo, color },
        },
      };
    }
    case 'todos/completeAll': {
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach(todo => {
        newEntities[todo.id] = { ...todo, completed: true };
      });
      return { ...state, entities: newEntities };
    }
    case 'todos/clearCompleted': {
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach(todo => {
        if (todo.completed) {
          delete newEntities[todo.id];
        }
      });
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'todos/loading': {
      return { ...state, status: 'loading' };
    }
    case 'todos/load': {
      const newEntities: Record<string, Todo> = {};
      action.payload.forEach(todo => {
        newEntities[todo.id] = todo;
      });
      return { ...state, status: 'idle', entities: newEntities };
    }
    default:
      return state;
  }
}

// THUNK.
export function fetchTodos() {
  return async function (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState,
  ) {
    dispatch({ type: 'todos/loading' });
    const response = await fetch('http://localhost:5000/todos');
    const todos = await response.json();
    dispatch({ type: 'todos/load', payload: todos });
  };
}

export function createTodo(text: string) {
  return async function (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState,
  ) {
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, completed: false }),
    });
    const todo = await response.json();
    dispatch(todoAdd(todo));
  };
}

// ACTION CREATORS.

export const todoAdd = (todo: Todo) => ({
  type: 'todos/add' as const,
  payload: todo,
});

export const todoToggle = (todoId: string) => ({
  type: 'todos/toggle' as const,
  payload: todoId,
});

export const todoColorSelect = (todoId: string, color: string) => ({
  type: 'todos/colorSelect' as const,
  payload: { todoId, color },
});

export const todoDelete = (todoId: string) => ({
  type: 'todos/delete' as const,
  payload: todoId,
});

export const todoCompleteAll = () => ({
  type: 'todos/completeAll' as const,
});

export const todoClearCompleted = () => ({
  type: 'todos/clearCompleted' as const,
});

// SELECTORS

export const selectTodos = (state: RootState) => Object.values(state.todos.entities);

export const selectTodobyId = (state: RootState, todoId: string) =>
  state.todos.entities[todoId];
