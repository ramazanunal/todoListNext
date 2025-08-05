"use client";
import {
  PiCheckCircleBold,
  PiTrashSimpleBold,
  PiCheckCircleFill,
} from "react-icons/pi";
export default function TodoListItem({todo, i, toggleStatus, removeTodo}) {
  
  if (!todo.status) {
    return (
      <li
        key={i}
        className="flex justify-between items-center bg-white p-2 rounded shadow hover:shadow-xl transition-shadow ease-in"
      >
        <div className="break-words w-4/5">{todo.todo}</div>
        <div className="w-1/5 flex justify-evenly">
          <button
            onClick={() => toggleStatus(todo.id, todo.status)}
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
    );
  } else if (todo.status) {
    return (
      <li
        key={i}
        className="flex justify-between items-center bg-green-100 p-2 rounded shadow hover:shadow-xl transition-shadow ease-in line-through text-green-500"
      >
        <div className="break-words w-4/5">{todo.todo}</div>
        <div className="w-1/5 flex justify-evenly">
          <button
            onClick={() => toggleStatus(todo.id, todo.status)}
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
    );
  }
}
