"use client";

import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, addDoc,onSnapshot,doc, deleteDoc  } from "firebase/firestore";
import { db } from "@/firestore";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

 useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todo'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("items",items);
      
      setTodos(items);
    });

    // Component unmount olduğunda dinlemeyi kapat
    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db,"todo"), {
      todo:input,
    });
    setInput("");
  };

  const removeTodo = async(id: number) => {
    await deleteDoc(doc(db, "todo", id));
  };
  // todo add firebase

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:py-10 flex flex-col border items-center">
      <h1 className="text-2xl font-bold mb-4">📋 Todo List</h1>

      <div className="border flex gap-2 mb-4">
        <input
          maxLength={100}
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
            className="flex justify-between items-center bg-white p-2 rounded shadow hover:shadow-xl transition-shadow ease-in"
          >
            <span>{todo.todo}</span>
            <button
              onClick={() => removeTodo(todo.id)}
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
