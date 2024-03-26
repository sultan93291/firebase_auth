"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import Link from "next/link";
//  track the change for files

import firebaseConfig from "@/Config/FireBase/firebaseConfig";
import { useRouter } from "next/navigation";
import { setUser } from "./Data/userSlice";
import { useDispatch } from "react-redux";
import RegisterLogin from "./components/RegisterLogin";
import { data } from "autoprefixer";
import { BsPersonVcardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

export default function Home() {
  const [user, setuser] = useState(null);
  const [Hide, setHide] = useState(true);
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleForm = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleShow = () => {
    setHide(!Hide);
  };

  const dispatch = useDispatch();

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
            alert("please verify your email address");
            const newUser = user.toJSON();
            const tokenId = newUser.stsTokenManager.accessToken;
            document.cookie = `accessToken=${tokenId}; path=/;`;
            window.location.reload();
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

  return (
    <div
      style={{ background: "url('/lake.jpg')" }}
      className=" h-screen w-screen bg-cover  bg-center after:absolute after:inset-0 after:z-0 after:bg-black after:opacity-45   "
    >
      <RegisterLogin />
      <div className=" flex h-[calc(100vh-80px)] px-[150px] items-center ">
        <form
          className="relative z-50 flex flex-col items-start "
          onSubmit={handleSubmit}
        >
          <p className=" text-white opacity-[0.6] text-[22px] uppercase font-[600] ">
            start for free
          </p>
          <h1 className=" text-[48px] text-white font-[800] ">
            Create a new account
          </h1>
          <span className="flex text-[22px] gap-[15px] ">
            <p className="text-white opacity-[0.7] capitalize ">
              already a member ?
            </p>
            <Link className="text-[#3cb8e4]  font-[600] " href={"/login"}>
              log in
            </Link>
          </span>
          <div className="my-[30px] flex flex-col gap-[20px] ">
            <div className=" flex  w-[420px]  gap-[10px]">
              <div className=" relative h-[60px] w-1/2">
                <input
                  type="name"
                  name="firstName"
                  placeholder=" first name"
                  onChange={handleForm}
                  className="relative h-full w-full  pl-[20px] pr-[40px] bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
                />
                <BsPersonVcardFill className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] " />
              </div>
              <div className=" relative h-[60px] w-1/2">
                <input
                  type="name"
                  name="lastName"
                  placeholder=" last name"
                  onChange={handleForm}
                  className="relative h-full w-full  pl-[20px] pr-[40px] bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
                />
                <BsPersonVcardFill className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] " />
              </div>
            </div>
            <div className="h-[60px] relative">
              <input
                type="email"
                placeholder="enter your email adress"
                name="email"
                onChange={handleForm}
                className=" h-full w-full px-[20px]  bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
              />
              <MdEmail className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] " />
            </div>
            <div className="h-[60px] relative">
              <input
                type={Hide ? "password" : "text"}
                placeholder="enter your password"
                name="password"
                onChange={handleForm}
                className=" h-full w-full px-[20px]  bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
              />
              {Hide ? (
                <AiFillEyeInvisible
                  className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] "
                  onClick={handleShow}
                />
              ) : (
                <AiFillEye
                  className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] "
                  onClick={handleShow}
                />
              )}
            </div>
          </div>
          <div className=" w-[420px]  flex gap-4 ">
            <button
              className="h-[60px] w-1/2 bg-rgba rounded-[30px] text-white text-[16px] opacity-[0.9] capitalize "
              disabled
            >
              {" "}
              change method
            </button>
            <button
              className="h-[60px] w-1/2 bg-[#3cb8e4] rounded-[30px] text-white text-[16px] capitalize "
              type="submit"
            >
              {" "}
              register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
