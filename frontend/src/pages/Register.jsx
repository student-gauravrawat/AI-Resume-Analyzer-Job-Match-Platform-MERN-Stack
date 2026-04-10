import React, { useState } from "react";
import ReactDom from "react-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { Input, Button } from "../components/index";
import { useForm } from "react-hook-form";
import { registerUser } from "../apis/auth";

function Register({ open, openLogin, onClose, onSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    alert("please wait⏳ first API call takes time");
    setLoading(true);
    try {
      console.log(data);
      const response = await registerUser(data);
      console.log(response);
      if (response?.success) {
        onSuccess(data.email)
        reset()
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return ReactDom.createPortal(
    open ? (
      <div
        className=" 
        fixed
        z-50 
        w-[35%]
        rounded-4xl 
        shadow-2xl 
        left-[35%]
        top-28
        overflow-hidden "
      >
        {/* Main Transparent Card */}
        <div className="relative w-full bg-white/20 backdrop-blur-xl shadow-2xl p-8 md:px-9 flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-slate-500 hover:text-black text-2xl font-bold cursor-pointer"
          >
            ✕
          </button>
          {/* Header Icons */}
          <div className="flex gap-1 mb-4 text-blue-300">
            <LuBrainCircuit size={32} />
            <IoDocumentTextOutline size={32} />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black">
              Create Your Account
            </h1>
            <p className="text-slate-200 mt-2">Unlock your career potential</p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="w-full">
            <Input
              placeholder="Full Name"
              icon={FaPencilAlt}
              {...register("fullName", {
                required: true,
              })}
            />

            <Input
              placeholder="Username"
              icon={HiOutlineUser}
              {...register("username", {
                required: true,
              })}
            />

            <Input
              placeholder="Email Address"
              type="email"
              icon={HiOutlineMail}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />

            {/* Role Input */}
            <div className="w-full mb-4 relative">
              <div className="relative">
                <select
                  defaultValue=""
                  {...register("role", { required: true })}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 text-black transition-all cursor-pointer appearance-none invalid:text-gray-800 "
                >
                  <option value="" disabled hidden>
                    Select Your Role
                  </option>

                  <option value="user" className="text-black">
                    User
                  </option>
                  <option value="admin" className="text-black">
                    Admin
                  </option>
                </select>

                {/* Dropdown Arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  ▼
                </div>
              </div>
            </div>

            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              text={
                loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sign up
                  </div>
                ) : (
                  "Sign Up"
                )
              }
              type="submit"
            />
          </form>

          {/* Login Redirect */}
          <div className="mt-8 text-center">
            <p className="text-slate-200 text-sm">Already have an account?</p>
            <button
              onClick={openLogin}
              className="text-blue-300 font-bold mt-1 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    ) : null,
    document.getElementById("portal"),
  );
}

export default Register;
