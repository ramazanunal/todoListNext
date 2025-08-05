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
import { Todo } from "@/app/Types";

export default function TodoList() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        todo: data.todo as string,
        status: data.status as boolean,
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
  const toggleStatus = async (id: string, status: boolean) => {
    const ref = doc(db, "todo", id);
    await updateDoc(ref, {
      status: !status,
    });
  };

  return (
    <>
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
            <div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Görevler</h2>
                <hr className="py-2 text-gray-400" />
                <ul className="space-y-2">
                  {todos
                    .filter((todo) => !todo.status)
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

              <div>
                <h2 className="text-xl font-semibold mb-2">Tamamlananlar</h2>
                <hr className="py-2 text-gray-400" />
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
    </>
  );
}
