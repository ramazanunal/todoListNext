// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH5fHszeA4QPM6pV3qIkCgOMk3dE-IJ4Y",
  authDomain: "todolist-9a181.firebaseapp.com",
  projectId: "todolist-9a181",
  storageBucket: "todolist-9a181.firebasestorage.app",
  messagingSenderId: "958983274000",
  appId: "1:958983274000:web:8174989346edbb5d461495",
  measurementId: "G-X546M677DR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// auth language is responsive to browser lang
auth.useDeviceLanguage();
export function signout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("sign out successfull");
    })
    .catch((error) => {
      // An error happened.
      console.error("An error happened.");
    });
}
export function signInPop() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const db = getFirestore(app);

export type TodoItemChildren = {
  text: string;
  completed: boolean;
};

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  children: Array<TodoItemChildren>;
};
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

const todos: TodoItem[] = [
  {
    title: "Alışveriş Listesi",
    completed: false,
    children: [
      { text: "Ekmek al", completed: false },
      { text: "Süt al", completed: true },
    ],
  },
  {
    title: "Projeyi Tamamla",
    completed: false,
    children: [
      { text: "Backend API yaz", completed: false },
      { text: "UI tasarla", completed: false },
    ],
  },
  {
    title: "Günlük Rutin",
    completed: true,
    children: [
      { text: "Sabah sporu", completed: true },
      { text: "Kitap oku", completed: true },
    ],
  },
];
