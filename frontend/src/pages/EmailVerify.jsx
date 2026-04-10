import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { LuBrainCircuit } from "react-icons/lu";
import { Input, Button } from "../components/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailVerify, resendOtp } from "../apis/auth";
import { useForm } from "react-hook-form";
import ReactDom from "react-dom"

function EmailVerify({open, onClose, email, onOpenLogin, onOpenRegister }) {
  const { handleSubmit, register, reset, watch, formState: {errors}, setValue } = useForm({
    defaultValues: {
      email: email || ""
    }
  });
  const currentEmail = watch("email")
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(email){
      setValue("email", email)
    }
  },[email])

  const handleResendOTP = async(email)=>{
      await resendOtp({email: currentEmail})
  }

  const handleEmailVerify = async (data) => {
    setLoading(true);
    alert("please wait...")
    try {
      const response = await emailVerify(data);
      if(response?.success) onOpenLogin();

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
        w-fit
        rounded-4xl 
        shadow-2xl 
        left-[38%]
        top-50
        overflow-hidden 
        ">
      <div className="relative w-full max-w-125 bg-white/20 backdrop-blur-xl shadow-2xl p-8 md:pt-12 md:px-12 md:pb-12 flex flex-col items-center">
      
        {/*Close Button*/}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-slate-500 hover:text-black text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Header Icons */}
        <div className="flex gap-2 mb-4 text-blue-300">
          <LuBrainCircuit size={32} />
          <IoDocumentTextOutline size={32} />
        </div>

        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Verify Your Email
          </h1>
          <p className="text-slate-200 mt-2 text-md md:text-base">
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

          <Button text={loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verify Email
                                    </div>
                                ) : "Verify Email"} type="submit" />
        </form>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-40 mt-6 md:mt-8">
          <button 
             onClick={onOpenLogin}
             className="text-blue-300 font-bold text-md md:text-base">
            Login
          </button>
          <button 
            onClick={onOpenRegister}
            className="text-blue-300 font-bold text-md md:text-base">
            Register New Account
          </button>
        </div>
      </div>
    </div>
    ): null ,
    document.getElementById("portal")
  );
}

export default EmailVerify;
