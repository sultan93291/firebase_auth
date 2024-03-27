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
import RegisterLogin from "../components/RegisterLogin";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [Hide, setHide] = useState(true);
  const hadndleForm = e => {
    const { name, value } = e.target;
    setuser(prevuser => ({ ...prevuser, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleShow = () => {
    setHide(!Hide);
  };
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
            Log in existing account
          </h1>
          <span className="flex text-[22px] gap-[15px] ">
            <p className="text-white opacity-[0.7] capitalize ">
              don't have a account ?
            </p>
            <Link className="text-[#3cb8e4]  font-[600] " href={"/"}>
              register
            </Link>
          </span>
          <div className="my-[30px] flex flex-col  gap-[20px] ">
            <div className="h-[60px] w-[360px] relative">
              <input
                type="email"
                placeholder="enter your email adress"
                name="email"
                onChange={hadndleForm}
                className=" h-full w-full pl-[20px] pr-[45px]  bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
              />
              <MdEmail className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] hover:text-[#3cb8e4] transition delay-150 " />
            </div>
            <div className="h-[60px] w-[360px] relative">
              <input
                type={Hide ? "password" : "text"}
                placeholder="enter your password"
                name="password"
                onChange={hadndleForm}
                className=" h-full w-full pl-[20px] pr-[45px] bg-rgba rounded-[15px] outline-none text-white placeholder:capitalize "
              />
              {Hide ? (
                <AiFillEyeInvisible
                  className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] hover:text-[#3cb8e4] transition delay-150 "
                  onClick={handleShow}
                />
              ) : (
                <AiFillEye
                  className="absolute top-0 right-0 mt-[30px] text-white translate-y-[-50%] mr-[15px] text-[22px] hover:text-[#3cb8e4] transition delay-150 "
                  onClick={handleShow}
                />
              )}
            </div>
          </div>
          <div className=" relative h-[60px]  w-[360px] flex gap-[20px]   ">
            <div className="  w-full  flex items-center justify-center   ">
              <p className="text-white text-[18px] opacity-[0.7] text-center   ">
                Forgot password ?
              </p>
            </div>
            {user.email && user.password ? (
              <button
                className="h-[60px] w-full bg-[#3cb8e4] rounded-[30px] text-white text-[16px] capitalize mx-auto  "
                type="submit"
              >
                {" "}
                login
              </button>
            ) : (
              <button
                className="h-[60px] w-full bg-[#3cb8e4] rounded-[30px] text-white text-[16px] capitalize mx-auto  "
                disabled
              >
                {" "}
                log in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
