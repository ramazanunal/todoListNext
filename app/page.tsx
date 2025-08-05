import React from "react";
import TodoList from "./components/TodoList/TodoList";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:py-10 flex flex-col border items-center">
      <TodoList />
    </main>
  );
}