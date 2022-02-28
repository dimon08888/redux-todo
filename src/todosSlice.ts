import store, { AppDispatch, RootState } from './store';
import { Todo } from './types';

type TodosState = {
  status: 'idle' | 'loading';
  entities: Todo[];
};

const initialState: TodosState = {
  status: 'idle',
  entities: [],
};

type TodosAction =
  | { type: 'todos/add'; payload: string }
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
      return {
        ...state,
        entities: [
          ...state.entities,
          {
            id: String(state.entities.length + 1),
            text: action.payload,
            completed: false,
          },
        ],
      };
    }
    case 'todos/toggle': {
      return {
        ...state,
        entities: state.entities.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    }
    case 'todos/delete': {
      return {
        ...state,
        entities: state.entities.filter(todo => todo.id !== action.payload),
      };
    }
    case 'todos/colorSelect': {
      const { todoId, color } = action.payload;
      return {
        ...state,
        entities: state.entities.map(todo =>
          todo.id === todoId ? { ...todo, color } : todo,
        ),
      };
    }
    case 'todos/completeAll': {
      return {
        ...state,
        entities: state.entities.map(todo => ({ ...todo, completed: true })),
      };
    }
    case 'todos/clearCompleted': {
      return {
        ...state,
        entities: state.entities.filter(todo => !todo.completed),
      };
    }
    case 'todos/loading': {
      return { ...state, status: 'loading' };
    }
    case 'todos/load': {
      return { status: 'idle', entities: action.payload };
    }
    default:
      return state;
  }
}

// THUNK.

export async function fetchTodos(
  dispatch: typeof store.dispatch,
  getState: typeof store.getState,
) {
  dispatch({ type: 'todos/loading' });
  fetch('http://localhost:5000/todos')
    .then(response => response.json())
    .then(todos => dispatch({ type: 'todos/load', payload: todos }));
}

// ACTION CREATORS.

export const todoAdd = (todoText: string) => ({
  type: 'todos/add' as const,
  payload: todoText,
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

export const selectTodos = (state: RootState) => state.todos.entities;
