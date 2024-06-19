import { useEffect, useState } from "react";
import {
  User as FirebaseUser,
  signOut as firebaseSignOut,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export async function signIn(
  email: string,
  password: string,
  rememberMe: boolean = false
) {
  try {
    rememberMe && (await setPersistence(auth, browserLocalPersistence));
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("error", error);
  }
}

export async function signOut() {
  return firebaseSignOut(auth).catch((error) => console.error(error));
}

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, user };
}
