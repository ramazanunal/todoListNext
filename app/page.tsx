"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">📋 Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yapılacak iş..."
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-white p-2 rounded shadow"
          >
            <span>{todo}</span>
            <button
              onClick={() => removeTodo(i)}
              className="text-red-500 hover:underline"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
