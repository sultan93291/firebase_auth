// dependencies

// external imports

import { NextRequest, NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./Config/FireBase/firebaseConfig";
import { initializeApp } from "firebase/app";



export default function middleware(req: NextRequest) {
  // extracting current pathname
  const pathName = req.nextUrl.pathname;
  const auth = getAuth();
  const isPublic = pathName === "/" || pathName === "/login";
  const isPrivate =
    pathName.startsWith("/profile/") ||
    pathName === "/profile" ||
    pathName.startsWith("/createtodo/") ||
    pathName.startsWith("/updatetodo/");

  // Listen for authentication state changes
  const unsubscribe = onAuthStateChanged(auth, user => {
    if (!user) {
      alert("not working");
      console.log("not working");
    }
    if (isPublic && user && user.emailVerified) {
      // User is signed in and email is verified
      return NextResponse.redirect(new URL("/about", req.nextUrl));
    }
  });

  // Unsubscribe from onAuthStateChanged when the middleware is finished
  unsubscribe();
}

export const config = {
  api: {
    externalResolver: true,
  },
};

// Function to check if a route is public
