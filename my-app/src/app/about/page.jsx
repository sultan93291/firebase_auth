"use client";
import React, { useEffect } from "react";
import firebaseConfig from "@/Config/FireBase/firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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

    signOut(auth)
      .then(() => {
        alert("successfully sign out ");
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
      })
      .catch(err => {
        alert("error singing out");
      });

    
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified) {
        console.log("true");
      } else {
        console.log("false");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div>
        <h1>successfully sign up </h1>
        <button onClick={handlesignOut}>sign out</button>
        <p> {} </p>
      </div>
    </>
  );
};

export default Page;
