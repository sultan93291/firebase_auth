"use client";
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "@/Config/FireBase/firebaseConfig";

const login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const hadndleForm = e => {
    const { name, value } = e.target;
    setuser(prevuser => ({ ...prevuser, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then(usercredentials => {
        if (usercredentials.user) {
          alert("successfully logged log in ");
          console.log(usercredentials.user.toJSON())
        }
        
      })
      .catch(err => {
        console.log(err);
        alert("can't log in ");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={hadndleForm}
          placeholder="enter your email adress"
        />
        <input
          type="password"
          name="password"
          onChange={hadndleForm}
          placeholder="enter your password"
        />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default login;
