import React from 'react';
import './App.css';
import { Footer } from './footer';
import { Header } from './header';
import { useAppDispatch } from './store';
import { TodoList } from './todo-list';
import { fetchTodos } from './todosSlice';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTodos as any);
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-center font-bold text-3xl text-red-800">Todos</h1>
      <div className="shadow mt-5 bg-slate-50 pb-2">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
