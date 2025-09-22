"use client";
import { signout } from "@/firebase";

export default function Login() {
  return <button onClick={signout}>Sign Out</button>;
}
