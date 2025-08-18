"use client";

import React, { useState, useEffect } from "react";
import { PiPlusCircle } from "react-icons/pi";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { TodoItem, Todo } from "@/app/Types";
import Link from "next/link";

import { db } from "@/firestore";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const handleAdd = async () => {
    //const data:TodoItem = [{id: "test", todo: "test", status: false,order:0}]
    await addDoc(collection(db, "todo"), {
      title: newTodo,
      order: 0,
      data: [],
    });
    console.log("Yeni görev:", newTodo);
    setNewTodo("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const items: Todo[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      setTodos(items);
      console.log("items", items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <main
        className={`min-h-screen bg-gray-100 p-4  md:py-8 flex flex-col items-center transition-all ${
          isModalOpen ? " blur-md " : "blur-none"
        }`}
      >
        <div className="w-full  block max-w-md bg-white rounded-md shadow-md p-4">
          <h1 className="font-medium text-3xl border-b mb-3 p-2 text-center">
            Görevlerim
          </h1>

          <ul className="max-h-96 overflow-y-auto">
            {todos.map((item, i) => (
              <Link key={i} href={{
                pathname:`/todo/${item.id}`,
                
              }}>
                <li key={i} className="shadow p-2 my-2 rounded transition-all hover:shadow-lg">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex justify-center items-center py-4">
            <button onClick={() => setIsModalOpen(true)} className="">
              <PiPlusCircle className="w-14 h-14 text-green-500 cursor-pointer hover:scale-125  transition-all " />
            </button>
          </div>
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0   flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()} // modal dışına tıklanınca kapanması için
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Yeni Görev Ekle</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>

            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni görev yaz..."
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />

            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Ekle
            </button>
          </div>
        </div>
      )}
    </>
  );
}
