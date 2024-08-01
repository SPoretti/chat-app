"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../../firebase";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/chat");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container-div">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-1/3 flex flex-col justify-evenly items-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="textfield"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="textfield"
        />
        <button type="submit" className="button">
          Sign In
        </button>
      </form>
      <Link
        href="/sign-up"
        className="bg-purple-600 rounded-md w-1/3 h-6 flex flex-row items-center justify-center"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </div>
  );
};

export default SignIn;
