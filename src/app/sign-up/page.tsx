"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../../firebase";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      router.push("/chat");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="container-div">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-1/3 flex flex-col justify-evenly items-center"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="textfield"
        />
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
          Sign Up
        </button>
      </form>
      <Link
        href="/sign-in"
        className="bg-purple-600 rounded-md w-1/3 h-6 flex flex-row items-center justify-center"
      >
        Already have an account? Sign in
      </Link>
    </div>
  );
};

export default SignUp;
