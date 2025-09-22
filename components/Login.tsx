"use client";
import { signInPop } from "@/firebase";

export default function Login() {
  return <button onClick={signInPop}>Login</button>;
}
