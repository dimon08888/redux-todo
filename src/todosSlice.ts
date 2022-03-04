import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdd: (state, action) => {
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggle: (state, action) => {
      const todo = state.entities[action.payload];
      todo.completed = !todo.completed;
    },
    todoColorSelect: {
      reducer: (state, action) => {
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare: ((todoId: string, color: string) => {
        return { payload: { todoId, color } };
      }) as any,
    },
    todoDelete: (state, action) => {
      delete state.entities[action.payload];
    },
    todoCompleteAll: state => {
      Object.values(state.entities).forEach(todo => {
        todo.completed = true;
      });
    },
    todoClearCompleted: state => {
      Object.values(state.entities).forEach(todo => {
        if (todo.completed) {
          delete state.entities[todo.id];
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities: Record<string, Todo> = {};
        action.payload.forEach((todo: Todo) => {
          newEntities[todo.id] = todo;
        });
        state.entities = newEntities;
        state.status = 'idle';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.entities[todo.id] = todo;
      });
  },
});

export const {
  todoAdd,
  todoToggle,
  todoDelete,
  todoColorSelect,
  todoCompleteAll,
  todoClearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:5000/todos');
  const todos = await response.json();
  return todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (text: string) => {
  const response = await fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, completed: false }),
  });
  const todo = await response.json();
  return todo;
});

// SELECTORS

export const selectTodos = (state: RootState) => Object.values(state.todos.entities);

export const selectTodobyId = (state: RootState, todoId: string) =>
  state.todos.entities[todoId];
