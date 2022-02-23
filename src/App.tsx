import React from 'react';
import './App.css';
import { Footer } from './footer';
import { Header } from './header';
import { TodoList } from './todo-list';

function App() {
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
