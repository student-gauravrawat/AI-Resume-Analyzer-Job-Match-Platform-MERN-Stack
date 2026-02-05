import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Input, Button } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../apis/auth";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await registerUser(data);
      console.log(response);
      if (response?.success) {
        navigate("/email-verify", {
          state: { email: data.email },
        });
        reset();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#e0eafc] to-[#cfdef3] p-2 font-sans">
      {/* Main Transparent Card */}
      <div className="relative w-full max-w-125 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-2xl p-8 md:p-10 flex flex-col items-center">
        {/* Header Icons */}
        <div className="flex gap-1 mb-4 text-blue-900">
          <LuBrainCircuit size={32} />
          <IoDocumentTextOutline size={32} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Your Account
          </h1>
          <p className="text-slate-500 mt-2">Unlock your career potential</p>
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
                className="w-full px-4 py-3 rounded-2xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 text-black transition-all cursor-pointer appearance-none invalid:text-gray-400 "
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
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
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
            text={loading ? "Registering you..." : "Sign Up"}
            type="submit"
          />
        </form>

        {/* Login Redirect */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">Already have an account?</p>
          <button className="text-blue-700 font-bold hover:underline mt-1">
            <Link to="/login"> Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
