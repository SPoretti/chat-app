"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  sendMessage,
  listenForMessages,
  getUserData,
} from "../../../firebase";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/sign-in");
      } else if (!user.emailVerified) {
        router.push("/verify-email");
      } else {
        const userData = await getUserData(user.uid);
        setUsername(userData.username);
        setIsEmailVerified(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const unsubscribe = listenForMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await sendMessage(message, user.uid);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => {
            const isCurrentUser = msg.username === username;
            return (
              <div
                key={msg.id}
                className={`w-full flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`message ${
                    isCurrentUser ? "bg-customBlue" : "bg-customGray"
                  } p-2 rounded-md`}
                >
                  <p className="font-bold text-customRed px-1">
                    {msg.username}:{" "}
                  </p>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            required
            className="h-10 w-full px-4 rounded-l-full text-customBeige border border-customRed bg-transparent"
          />
          <button
            type="submit"
            className="bg-customRed h-10 w-10 rounded-r-full"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
