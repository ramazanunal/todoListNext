"use client";
import React from "react";
import TodoList from "@/app/components/TodoList/TodoList";
import { useParams } from "next/navigation";

export default function TodoPage() {
  const params = useParams<{slug:string}>();
  
  console.log(params.slug);
  
  return (
    <div>
      <TodoList todoId={params.slug} />
    </div>
  )
}