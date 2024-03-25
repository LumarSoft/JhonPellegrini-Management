import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app";

export const loginWithMailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    console.error(error);
  }
};
