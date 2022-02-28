import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import filtersReducer from './filtersSlice';
import todosReducer from './todosSlice';
import { loggerMiddleware } from './middleware';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

const middlewareEnhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);
const composedEnhancer = composeWithDevTools(middlewareEnhancer);

const store = createStore(rootReducer, composedEnhancer);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
