"use client";

import Link from "next/link";
import { auth } from "../../../firebase";
import { logout } from "../../../firebase";

export default function Navbar() {
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, redirect to the sign-in page or show a message
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logoContainer">
        <Link href="/chat" className="logo">
          <i className="fas fa-comments"></i>
        </Link>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-end">
        <Link href="/sign-in" className="navLink">
          Login
        </Link>
        <button onClick={handleLogout} className="navLink ml-2">
          <i className="fas fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
}
