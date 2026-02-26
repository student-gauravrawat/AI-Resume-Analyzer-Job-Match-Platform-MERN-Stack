import React, {useState} from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import {Input, Button} from "../index"
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import {login} from "../../apis/auth"
import {useDispatch} from "react-redux"
import {setAuthUser} from "../../redux/authSlice"

function Login() {

  const {register, handleSubmit, reset} = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const handleLogin = async(data)=>{
    setLoading(true)
    try {
      const userdata = {
        password: data.password,
      }

      if(data.identifier.includes("@")){
         userdata.email = data.identifier
      }else{
        userdata.username = data.identifier
      }

      const response = await login(userdata)
      console.log(response)
      dispatch(setAuthUser(response.loggedUser))
      navigate("/")

    } catch (error) {
      console.log("error", error)
      
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#e0eafc] to-[#cfdef3] px-4  font-sans">
      {/* Main Transparent Card */}
      <div className="relative w-full max-w-125 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-2xl p-8 md:p-12 flex flex-col items-center">
        {/* Header Icons */}
        <div className="flex gap-1 mb-4 text-blue-900">
          <LuBrainCircuit size={32} />
          <IoDocumentTextOutline size={32} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Login Your Account
          </h1>
          <p className="text-slate-500 mt-2">Unlock your career potential</p>
        </div>

        <form  
          onSubmit={handleSubmit(handleLogin)}
          className="w-full"
          >

          <Input 
            placeholder="Username or Email"  
            {
              ...register("identifier", {required: true})
            }  
            />

          <Input
            placeholder="Password"
            type="password"
            {
              ...register("password", {required: true})
            }
          />

           <Button text={loading ? "Login..." : "Login"} type="submit"/>
        </form>

        {/* Register & Email Verify Redirect */}
        <div className=" flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-20 mt-6 md:mt-8 ">

          <button className="text-blue-700 font-bold hover:underline mt-1">
           <Link to="/email-verify"> Verify your email</Link>
          </button>
    
          <button className="text-blue-700 font-bold hover:underline mt-1">
             <Link to="/register"> Register New Account</Link>
          </button>
      
        </div>
      </div>
    </div>
  );
}

export default Login;
