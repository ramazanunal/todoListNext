"use client";

import {
  PiCheckCircleBold,
  PiTrashSimpleBold,
  PiCheckCircleFill,
} from "react-icons/pi";
import {TodoItem} from  "../../Types";
import { useEffect, useState } from "react";

type Props = {
  todo: TodoItem;
  index: number;
  toggleStatus: (id: string, status: boolean) => void;
  removeTodo: (id: string) => void;
};

export default function TodoListItem({
  todo,
  index,
  toggleStatus,
  removeTodo,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    // Component ilk render olduğunda animasyon başlasın
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleRemove = () => {
    setRemoving(true); // çıkış animasyonu başlasın
    setTimeout(() => removeTodo(todo.id), 300); // 300ms sonra gerçekten silinsin
  };

  const baseClasses =
    "transition-all duration-300 ease-in-out transform flex justify-between items-center p-2 rounded shadow hover:shadow-xl";

  const animationClasses = mounted
    ? removing
      ? "opacity-0 scale-95 -translate-y-2"
      : "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-2";

  const commonContent = (
    <>
      <div className="break-words w-4/5">{todo.todo}</div>
      <div className="w-1/5 flex justify-evenly">
        <button
          onClick={() => toggleStatus(todo.id, todo.status)}
          className="text-green-500 p-2 text-xl hover:bg-green-200 transition-all ease-in rounded-full cursor-pointer"
        >
          {todo.status ? <PiCheckCircleFill /> : <PiCheckCircleBold />}
        </button>
        <button
          onClick={handleRemove}
          className="text-red-500 p-2 text-xl hover:bg-red-200 transition-all ease-in rounded-full cursor-pointer"
        >
          <PiTrashSimpleBold />
        </button>
      </div>
    </>
  );

  return (
    <li
      key={index}
      className={`${baseClasses} ${animationClasses} ${
        todo.status
          ? "bg-green-100 line-through text-green-500"
          : "bg-white"
      }`}
    >
      {commonContent}
    </li>
  );
}
