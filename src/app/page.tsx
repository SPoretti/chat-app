"use client";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/sign-in");
  };

  return (
    <div className="container-div">
      <h1>Welcome to ChatApp</h1>
      <p>
        ChatApp is a real-time messaging application that allows you to connect
        with friends and family instantly. Sign in to start chatting!
      </p>
      <button onClick={handleLoginRedirect} className="button">
        Go to Login
      </button>
    </div>
  );
};

export default LandingPage;
