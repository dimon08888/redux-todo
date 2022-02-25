import { Todo } from './types';

type TodosState = Todo[];

const initialState: TodosState = [
  { id: '1', text: 'Learn React', completed: true },
  { id: '2', text: 'Learn Redux', completed: false, color: 'purple' },
  { id: '3', text: 'Build something fun', completed: false, color: 'blue' },
];

type TodosAction =
  | { type: 'todos/add'; payload: string }
  | { type: 'todos/toggle'; payload: string }
  | { type: 'todos/delete'; payload: string }
  | { type: 'todos/colorSelect'; payload: { todoId: string; color: string } }
  | { type: 'todos/completeAll' }
  | { type: 'todos/clearCompleted' };

export default function todosReducer(
  state = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case 'todos/add': {
      return [
        ...state,
        {
          id: String(initialState.length + 1),
          text: action.payload,
          completed: false,
        },
      ];
    }
    case 'todos/toggle': {
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
    }
    case 'todos/delete': {
      return state.filter(todo => todo.id !== action.payload);
    }
    case 'todos/colorSelect': {
      const { todoId, color } = action.payload;
      return state.map(todo => (todo.id === todoId ? { ...todo, color } : todo));
    }
    case 'todos/completeAll': {
      return state.map(todo => ({ ...todo, completed: true }));
    }
    case 'todos/clearCompleted': {
      return state.filter(todo => !todo.completed);
    }

    default:
      return state;
  }
}
