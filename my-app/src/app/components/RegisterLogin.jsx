" use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const RegisterLogin = () => {
  return (
    <>
      <nav className=" relative z-50 flex h-[80px]  px-[100px] items-center justify-between ">
        <div className="flex gap-4 items-center ">
          <div className="bg-[#3cb8e4]  h-[50px] w-[50px] rounded-full flex items-center justify-center "></div>
          <h4 className="text-[22px] capitalize font-[500] text-white opacity-[0.8]    ">
            {" "}
            Firebase Auth{" "}
          </h4>
        </div>
        <div className="flex gap-[40px] opacity-[0.7] ">
          <Link className="text-white text-[20px] capitalize  " href="/login">
            login
          </Link>
          <Link className=" text-white text-[20px] capitalize " href="/">
            register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default RegisterLogin;
