import React, { useState } from 'react'
import { LuBrainCircuit } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import {useForm} from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import {changePassword} from "../../apis//auth"
import {Input, Button} from "../index"


function ChangePassword() {

  const {register, handleSubmit, reset} = useForm()
  const [loading, setLoading] = useState(false)

  const handlePassword = async(data)=>{
    setLoading(true)
     try {
       console.log(data)
       await changePassword(data)

     } catch (error) {
        console.log("Error", error)
     } finally {
        setLoading(false)
        reset()
     }
  }
  

  return (
       <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br px-4 bg-gray-100 font-sans">
      {/* Main Transparent Card */}
      <div className="relative w-full max-w-125 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-2xl p-8 md:p-12 flex flex-col items-center">
        {/* Header Icons */}
        <div className="flex gap-1 mb-4 text-blue-900">
          <LuBrainCircuit size={32} />
          <IoDocumentTextOutline size={32} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Change your Password
          </h1>
          <p className="text-slate-500 mt-2">Secure your account in seconds.</p>
        </div>

        <form  
          onSubmit={handleSubmit(handlePassword)}
          className="w-full"
          >

          <Input 
            placeholder="Old password"  
            type='password'
            {
              ...register("oldPassword", {required: true})
            }  
            />

          <Input
            placeholder="New password"
            type="password"
            {
              ...register("newPassword", {required: true})
            }
          />

           <Button text={loading ? "Password Changing..." : "Change Password"} type="submit"/>
        </form>

      </div>
    </div>
  )
}

export default ChangePassword
