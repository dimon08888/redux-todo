import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import filtersReducer from './filtersSlice';
import todosReducer from './todosSlice';

/*
  ## ACTIONS
  { type: 'todos/add', payload: todoText }
  { type: 'todos/toggle', payload: todoId }
  { type: 'todos/delete', payload: todoId }
  { type: 'todos/colorSelect', payload: { todoId, color } }
  { type: 'todos/completeAll' }
  { type: 'todos/clearCompleted' }
  { type: 'filters/statusChange', payload: statusValue }
  { type: 'filters/colorsChanged', payload: { color, changeType } }

*/

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

const devToolsEnhancer = composeWithDevTools();

const store = createStore(rootReducer, devToolsEnhancer);
export default store;

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
