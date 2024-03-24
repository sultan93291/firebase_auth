"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "@/Config/FireBase/firebaseConfig";
import { setUser } from "../Data/userSlice";
import { useDispatch } from "react-redux";

const login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const hadndleForm = e => {
    const { name, value } = e.target;
    setuser(prevuser => ({ ...prevuser, [name]: value }));
  };
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then(usercredentials => {
        if (usercredentials.user) {
          alert("successfully logged log in ");
          const newUser = usercredentials.user.toJSON();
          const tokenId = newUser.stsTokenManager.accessToken;
          document.cookie = `accessToken=${tokenId}; path=/;`;
          window.location.reload();
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
