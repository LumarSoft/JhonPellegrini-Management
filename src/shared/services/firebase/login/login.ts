"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app";

export const singInWhitEmailAndPassword = async (
  email: string,
  password: string
) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const email = user?.email;
      const accessToken = user?.refreshToken;

      const credentials = {
        email,
        accessToken,
      };
      return credentials;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  return credentials;
};
