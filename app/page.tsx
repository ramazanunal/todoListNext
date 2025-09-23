"use client";

import Login from "@/components/Login";
import SignOut from "@/components/SignOut";
import {
  newTodo,
  TodoItem,
  getAllData,
  removeTodoItem,
  removeTodo,
  updateTodo,
} from "@/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<TodoItem[]>([]);

  const todos: TodoItem = {
    title: "Alışveriş Listesi",
    completed: false,
    children: [
      { text: "Ekmek al", completed: false },
      { text: "Süt al", completed: true },
    ],
  };
  useEffect(() => {
    getAllData().then((result) => {
      if (result.length > 0) {
        setData(result);
      }
    });
    //newTodo(todos);
    //setData((data)=>{ data = getAllData()})
  }, []);

  useEffect(() => {
    console.log("data güncellendi:", data);
    if (data.length > 0) {
      //removeTodo(data[0].id)
      const payload: TodoItem = {
        id: data[0].id,
        title: "this has been changed",
        completed: true,
        children: [
          { text: "Ekmek al", completed: false },
          { text: "Süt al", completed: true },
          { text: "Ekmesk al", completed: false },
          { text: "Süt asdsdsdl", completed: true },
          { text: "Ekmsdek al", completed: false },
          { text: "Süt sdsdal", completed: true },
        ],
      };
      updateTodo(data[0].id, payload);
    }
  }, [data]);

  return (
    <div className="flex justify-between ">
      <h1>hello world</h1>
      <Login />
      <SignOut />
    </div>
  );
}
