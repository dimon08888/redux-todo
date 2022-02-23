import React from 'react';
import './App.css';
import { Footer } from './footer';
import { Header } from './header';
import { TodoList } from './todo-list';

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-center font-bold">Todos</h1>
      <div className="shadow mt-5">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
