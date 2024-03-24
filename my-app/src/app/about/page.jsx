"use client";
import React, { useEffect } from "react";
import firebaseConfig from "@/Config/FireBase/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../Data/userSlice";

// ##  checking for comment
const Page = () => {
  const user = useSelector(selectUser);

  if (user != null && user !== undefined) {
    console.log(user);
    console.log(user.emailVerified);
    console.log(user.apiKey);
    console.log(user.stsTokenManager.accessToken);
  }

  const handlesignOut = async () => {
    const auth = getAuth();
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut(auth)
      .then(() => {
        alert("successfully sign out ");
      })
      .catch(err => {
        alert("error singing out");
      });
  };
  return (
    <>
      <div>
        <h1>successfully sign up </h1>
        <button onClick={handlesignOut}>sign out</button>
      </div>
    </>
  );
};

export default Page;
