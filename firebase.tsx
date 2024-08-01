// firebase.tsx
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get as firebaseGet,
  push,
  onValue,
  query,
  orderByChild,
  DatabaseReference,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Authentication functions
export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
  console.log(firebaseConfig);
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const userId = userCredential.user.uid;
  await set(ref(db, `users/${userId}`), {
    username,
    email,
  });
};

// Realtime Database functions
export const sendMessage = async (message: string, userId: string) => {
  const userRef = ref(db, `users/${userId}`);
  const userSnapshot = await firebaseGet(userRef); // Use the aliased get function
  if (userSnapshot.exists()) {
    const userData = userSnapshot.val(); // Ensure userSnapshot is awaited and has val method
    const username = userData.username;

    const messageListRef = ref(db, "messages");
    const newMessageRef = push(messageListRef);
    await set(newMessageRef, {
      text: message,
      userId,
      username,
      createdAt: new Date().toISOString(),
    });
  } else {
    throw new Error(`User data not found for userId: ${userId}`);
  }
};

export const listenForMessages = (callback: (messages: any[]) => void) => {
  const messagesRef = query(ref(db, "messages"), orderByChild("createdAt"));
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const messages: any[] = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    callback(messages);
  });
  return unsubscribe;
};

export { app, auth, db };
function get(userRef: DatabaseReference) {
  throw new Error("Function not implemented.");
}
