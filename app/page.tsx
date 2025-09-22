import Login from "@/components/Login";
import SignOut from "@/components/SignOut";

export default function Home() {
  return (
    <div className="flex justify-between ">
      <h1>hello world</h1>
      <Login />
      <SignOut />
    </div>
  );
}
