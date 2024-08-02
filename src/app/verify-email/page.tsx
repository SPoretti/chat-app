"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";

function VerifyEmailPage() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push("/chat");
        }
      }
    };

    checkEmailVerification();
  }, [router]);

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload(); // Reload user to get the latest info
      if (user.emailVerified) {
        setMessage("Your email is already verified.");
        return;
      }
      try {
        await sendEmailVerification(user);
        setMessage("Verification email resent. Please check your inbox.");
      } catch (error) {
        setMessage("Failed to resend verification email. Please try again.");
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="container-div">
        <h1 className="text-customRed text-4xl font-bold">
          Re-send email verification
        </h1>
        <h1>Check your email for the verification link</h1>
        <p>
          We have sent a verification link to your email address. Please click
          on the link to verify your email.
        </p>
        <p>
          If you haven&apos;t received the email, please check your spam folder
          or request a new verification link.
        </p>
        {message && <p>{message}</p>}
        <button
          onClick={handleResendVerification}
          className="border border-customBeige rounded-full shadow-md hover:bg-customBeige hover:text-customDarkGray h-10 w-3/5"
        >
          Resend verification link
        </button>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
