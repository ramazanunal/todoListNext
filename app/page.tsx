"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firestore";

import { PiCheckCircleBold, PiTrashSimpleBold,PiCheckCircleFill  } from "react-icons/pi";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("items", items);

      setTodos(items);
    });

    // Component unmount olduğunda dinlemeyi kapat
    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "todo"), {
      todo: input,
      status: false,
    });
    setInput("");
  };

  const removeTodo = async (id: number) => {
    await deleteDoc(doc(db, "todo", id));
  };
  // todo add firebase
  const toggleStatus = async(id:string,status:boolean) => {
    const ref = doc(db,"todo",id)
    await updateDoc(ref,{
      status:!status
    })
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:py-10 flex flex-col border items-center">
      <h1 className="text-2xl font-bold mb-4">📋 Todo List</h1>

      <div className="flex gap-2 mb-4 w-full justify-center">
        <input
          maxLength={100}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yapılacak iş..."
          className="p-2 border border-gray-300 rounded w-2/5"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        <div className="space-y-6">
          {/* Aktif Görevler */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Görevler</h2>
            <hr className="py-2 text-gray-400" />
            <ul className="space-y-2">
              {todos
                .filter((todo) => !todo.status)
                .map((todo, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white p-2 rounded shadow hover:shadow-xl transition-shadow ease-in"
                  >
                    <div className="break-words w-4/5">{todo.todo}</div>
                    <div className="w-1/5 flex justify-evenly">
                      <button
                        onClick={() => toggleStatus(todo.id,todo.status)}
                        className="text-green-500 p-2 text-xl hover:bg-green-200 transition-all ease-in rounded-full cursor-pointer"
                      >
                        <PiCheckCircleBold />
                      </button>
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-500 p-2 text-xl hover:bg-red-200 transition-all ease-in rounded-full cursor-pointer"
                      >
                        <PiTrashSimpleBold />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Tamamlananlar */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Tamamlananlar</h2>
            <hr className="py-2 text-gray-400" />
            <ul className="space-y-2">
              {todos
                .filter((todo) => todo.status)
                .map((todo, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-green-100 p-2 rounded shadow hover:shadow-xl transition-shadow ease-in line-through text-green-500"
                  >
                    <div className="break-words w-4/5">{todo.todo}</div>
                    <div className="w-1/5 flex justify-evenly">
                      <button
                        onClick={() => toggleStatus(todo.id,todo.status)}
                        className="text-green-500 p-2 text-xl hover:bg-green-300 transition-all ease-in rounded-full cursor-pointer"
                      >
                        <PiCheckCircleFill />
                      </button>
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-500 p-2 text-xl hover:bg-red-200 transition-all ease-in rounded-full cursor-pointer"
                      >
                        <PiTrashSimpleBold />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </ul>
    </main>
  );
}
