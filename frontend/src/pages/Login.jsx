import React, { useState } from "react";
import ReactDom from "react-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { Input, Button } from "../components/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../apis/auth";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";


function Login({ open, openRegister, onClose, openVerify }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    alert("Please wait, First call takes time");
    try {
      const userdata = {
        password: data.password,
      };

      if (data.identifier.includes("@")) {
        userdata.email = data.identifier;
      } else {
        userdata.username = data.identifier;
      }

      const response = await login(userdata);
      // console.log(response)
      dispatch(setAuthUser(response.loggedUser));
      onclose(); //for closing portal
      navigate("/");
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
        top-40
        overflow-hidden 
        "
      >
        {/* Main Transparent Card */}
        <div className="relative w-full max-w-125 bg-white/20 backdrop-blur-xl  shadow-2xl p-8 md:p-12 flex flex-col items-center">
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
              Login Your Account
            </h1>
            <p className="text-slate-200 mt-2">Unlock your career potential</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="w-full">
            <Input
              placeholder="Username or Email"
              {...register("identifier", { required: true })}
            />

            <Input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />

            <Button
              text={
                loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Login...
                  </span>
                ) : (
                  "Login"
                )
              }
              type="submit"
            />
          </form>

          {/* Register & Email Verify Redirect */}
          <div className=" flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-20 mt-6 md:mt-8 ">
            <button 
             onClick={openVerify}
             className="text-blue-300 font-bold  mt-1">
               Verify your email
            </button>

            <button
              onClick={openRegister}
              className="text-blue-300 font-bold  mt-1"
            >
              Register New Account
            </button>
          </div>
        </div>
      </div>
    ) : null,
    document.getElementById("portal"),
  );
}

export default Login;
