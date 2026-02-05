import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { LuBrainCircuit } from "react-icons/lu";
import { Input, Button } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailVerify, resendOtp } from "../../apis/auth";
import { useForm } from "react-hook-form";

function EmailVerify() {
  const location = useLocation()
  const emailFromState = location.state?.email || "";
  const { handleSubmit, register, reset, watch,formState: {errors} } = useForm({
    defaultValues: {
      email: emailFromState
    }
  });
  const currentEmail = watch("email")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleResendOTP = async(email)=>{
      await resendOtp({email: currentEmail})
  }

  const handleEmailVerify = async (data) => {
    setLoading(true);

    try {
      const response = await emailVerify(data);
      if(response?.success) navigate("/login")

    } catch (error) {
      console.log("error", error);

    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#e0eafc] to-[#cfdef3] px-4  font-sans">
      <div className="relative w-full max-w-125 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl pt-8 px-6 pb-6 md:pt-12 md:px-12 md:pb-12 flex flex-col items-center">
        {/* Header Icons */}
        <div className="flex gap-2 mb-4 text-blue-900">
          <LuBrainCircuit size={32} />
          <IoDocumentTextOutline size={32} />
        </div>

        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Verify Your Email
          </h1>
          <p className="text-slate-500 mt-2 text-md md:text-base">
            Unlock your career potential
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(handleEmailVerify)}
          className="w-full space-y-4"
        >
          <div className="w-full">
            <Input 
              placeholder="Email" 
              icon={HiOutlineMail} 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
          </div>

         <div className="text-end">
            <button 
               onClick={handleResendOTP}
               className="hover:underline mr-3 text-sm text-blue-500 ">Resend OTP</button>
          </div>
          <div className="w-full mb-6">
              <Input
                placeholder="Enter 6-digit OTP"
                type="text"
                maxLength="6"
                classname="tracking-[0.5em] text-center font-mono text-xl"
                {
                  ...register("otp", {
                  required: true,
                  onChange: (e) => {
                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                     }
                  })
                }
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1 ml-2">{errors.otp.message}</p>}
          </div>

          <Button text={loading ? "Verifying..." : "Verify Email"} type="submit" />
        </form>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-40 mt-6 md:mt-8">
          <button className="text-blue-700 font-bold hover:underline text-md md:text-base">
            <Link to="/login">Login</Link>
          </button>
          <button className="text-blue-700 font-bold hover:underline text-md md:text-base">
            <Link to="/register">Register New Account</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
