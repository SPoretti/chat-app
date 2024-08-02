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
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="container-div">
        <h1 className="text-customRed text-4xl font-bold">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 h-fit flex flex-col justify-evenly items-center"
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
          className="text-customBeige rounded-md w-1/3 h-6 flex flex-row items-center justify-center"
        >
          Don&apos;t have an account?{" "}
          <p className="text-customRed font-bold"> Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
