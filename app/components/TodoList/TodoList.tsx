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
import TodoListItem from "./TodoListItem";
import { TodoItem } from "@/app/Types";

export default function TodoList({todoId}) {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [input, setInput] = useState("");
  
  
  useEffect(() => {
  if (!todoId) return; // id yoksa çalışmasın

  const unsubscribe = onSnapshot(doc(db, "todo", todoId), (snapshot) => {
    console.log("g");
    
    if (snapshot.exists()) {
      const data = snapshot.data() as TodoItem;
      setTodos([
        {
          id: snapshot.id,
          todo: data.todo ?? "",
          status: data.status ?? false,
          order: data.order ?? 0,
        },
      ]);
      console.log(data);
      setTodos(data.data)
      
    } else {
      setTodos([]); // doküman bulunmazsa boş liste
    }
  });

  return () => unsubscribe();
}, [todoId]);
  // todo : Burada kaldım. Update işlemi yapılacak burada. 
  const addTodo = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "todo"), {
      todo: input,
      status: false,
      order:0,
    });
    setInput("");
  };

  const removeTodo = async (id: string,index: number) => {
    await deleteDoc(doc(db, "todo", id));
  };
  // todo add firebase
  const toggleStatus = async (id: string,index: number, status: boolean) => {
    const ref = doc(db, "todo", id);
    await updateDoc(ref, {
    });
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 p-4  md:py-8 flex flex-col items-center transition-all`}
    >
      <h1 className="text-2xl font-bold mb-4">📋 Todo List</h1>

      <div className="flex gap-2 mb-4 w-full justify-center">
        <input
          maxLength={100}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yapılacak iş..."
          className="p-2 border border-gray-300 rounded w-96"
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
          {todos.length == 0 && (
            <div className="text-center text-md p-5">
              Aktif görev bulunmamaktadır...
            </div>
          )}

          {todos.length > 0 && (
            <div className="">
              <div>
                <h2
                  className={`text-xl font-semibold mb-3 pb-2 border-b ${
                    todos.filter((todo) => !todo.status).length > 0
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {todos.filter((todo) => !todo.status).length > 0 &&
                    "Görevler"}
                </h2>
                <ul className="space-y-2">
                  {todos
                    .filter((todo) => !todo.status)
                    .map((todo, index) => (
                      <TodoListItem
                        key={index}
                        todo={todo}
                        index={index}
                        toggleStatus={toggleStatus}
                        removeTodo={removeTodo}
                      />
                    ))}
                </ul>
              </div>

              <div className="mt-5">
                <h2
                  className={`text-xl font-semibold mb-3 pb-2 border-b ${
                    todos.filter((todo) => todo.status).length > 0
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {todos.filter((todo) => todo.status).length > 0 &&
                    "Tamamlananlar"}
                </h2>
                <ul className="space-y-2">
                  {todos
                    .filter((todo) => todo.status)
                    .map((todo, i) => (
                      <TodoListItem
                        key={i}
                        todo={todo}
                        i={i}
                        toggleStatus={toggleStatus}
                        removeTodo={removeTodo}
                      />
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}
