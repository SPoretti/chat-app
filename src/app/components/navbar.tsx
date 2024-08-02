import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logoContainer">
        <Link href="/chat" className="logo">
          <i className="fas fa-comments"></i>
        </Link>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-end">
        <Link href="/sign-in" className="navLink">
          Sign in
        </Link>
        <Link href="/sign-up" className="navLink ml-2">
          Sign up
        </Link>
      </div>
    </nav>
  );
}
