import firebase_app from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);
// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   return signInWithPopup(auth, provider);
// };

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
