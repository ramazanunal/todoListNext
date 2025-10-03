import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

import { app } from "./firebase";
import { TodoItem, TodoItemChildren } from "./types";

const db = getFirestore(app);

// it can also delete child todo items be careful with it!
export async function updateTodo(todoItemId: string, newTodoItem: TodoItem) {
  await setDoc(doc(db, "todos", todoItemId), newTodoItem);
}

export async function newTodo(todoItem: TodoItem) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "todos"), todoItem);
  console.log("Document written with ID: ", docRef.id);
}

export async function getAllDataRealtime() {
  const unsub = onSnapshot(doc(db, "todos"), (doc) => {
    console.log("Current data: ", doc.data());
  });
}

export async function getAllData() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const data: Array<TodoItem> = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const payload: TodoItem = {
      id: doc.id,
      title: doc.data().title,
      completed: doc.data().completed,
      children: doc.data().children,
    };
    data.push(payload);
  });
  return data;
}

export async function removeTodo(id: string) {
  await deleteDoc(doc(db, "todos", id));
}

export async function removeTodoItem(
  todoItem: TodoItem,
  todoChildText: string
) {
  const resultChild = todoItem.children.filter((child) => {
    console.log(child.text, todoChildText);

    console.log("sonuç", child.text === todoChildText);

    return child.text !== todoChildText;
  });
  console.log("outside", resultChild);

  todoItem.children = resultChild;

  await setDoc(doc(db, "todos", todoItem.id), todoItem);
}
