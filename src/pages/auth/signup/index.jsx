import { kronaOne, poppins } from "@/constant/fonts";
import React from "react";

function index() {
  return (
    <div className="w-[80vw] h-[70vh] flex rounded-2xl overflow-hidden shadow-md shadow-[#191917]">
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#2A2A27]">
        <h3 className={`${kronaOne.className} text-[48px]`}>
          Pijar<span className="text-[#F04BFF]">.</span>
        </h3>
        <div className="text-center">
          <h1 className="font-kronaOne text-[16px] font-normal">
            purchase tickets and charity at <br /> the
            <span className="text-[#F04BFF]"> same time.</span>
          </h1>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#21211E]">
        <h1 className="text-3xl font-semibold">Sign up</h1>
        <div className="flex flex-col p-4">
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="enter your email"
            className="w-72 h-12 bg-[#4D4D4B] rounded-lg border-2 border-[#8E8E8E] pl-4"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="enter your password"
            className="w-72 h-12 bg-[#4D4D4B] rounded-lg border-2 border-[#8E8E8E] pl-4"
          />
        </div>
        <div className="flex flex-col p-4">
          <label>Re-Enter Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="re-enter your password"
            className="w-72 h-12 bg-[#4D4D4B] rounded-lg border-2 border-[#8E8E8E] pl-4"
          />
        </div>
        <div className="p-4">
          <button className="w-32 h-10 bg-[#2A2A27] rounded-2xl shadow-md shadow-[#191917]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
