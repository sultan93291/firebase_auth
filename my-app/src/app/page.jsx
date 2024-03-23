"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

//  track the change for files

import firebaseConfig from "@/Config/FireBase/firebaseConfig";
import { useRouter } from "next/navigation";
import { setUser } from "./Data/userSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [user, setuser] = useState(null);
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleForm = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified) {
        dispatch(setUser(user.toJSON()));
        setuser(user.toJSON());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = Data;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        alert("User signed up successfully");
        sendEmailVerification(user)
          .then(() => {
            alert("email verification link sent successfully");
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // ..
      });
  };

  useEffect(() => {
    if (user && user.emailVerified) {
      console.log(user);
    }
  }, [user]);

 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          name="name"
          placeholder="enter y9ur namew"
          onChange={handleForm}
        />
        <input
          type="email"
          placeholder="enter your email adress"
          name="email"
          onChange={handleForm}
        />
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          onChange={handleForm}
        />
        <button type="submit"> sign in</button>
      </form>
      {user ? <h1>user logged in </h1> : <h1>please log in </h1>}
    </>
  );
}
