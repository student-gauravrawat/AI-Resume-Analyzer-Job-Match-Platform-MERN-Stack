import api from "../utils/axiosInterceptor"
import toast from "react-hot-toast"


export const registerUser = async(userData)=>{
   try {
      const response = await api.post(`/users/register`, 
         userData,
         {
            headers: {
             "Content-Type": "application/json"
           }
        }
      )
      toast.success(response?.data?.message)
      return response.data;

   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const emailVerify = async(data)=>{
   try {
     const response = await api.post(`/users/email-verify`,
      data,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
     )
     toast.success(response?.data?.message)
     return response.data;
   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const resendOtp = async(email)=>{
   try {
     const response = await api.post(`/users/resend-otp`,
      email,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
     )
     toast.success(response?.data?.message)
     return response.data;
   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const login = async(userData)=>{
   try {
    const response = await api.post(`/users/login`,
      userData,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
     )
     if(!response) return null;
     toast.success(response?.data?.message)
     return response?.data?.data;
   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const logout = async()=>{
   try {
     const response = await api.get(`/users/logout`)
     toast.success(response?.data?.message)
     return response.data;

   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const changePassword = async(data)=>{
   try {
     const response = await api.patch(`/users/change-password`,
        data,
        {
           headers: {
            "Content-Type": "application/json"
           }
        }
     )
     toast.success(response?.data?.message)
     return response.data;

   } catch (error) {
    const msg =  error.response?.data?.error ||
                 error.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
   }
}

export const getUser = async()=>{
  try {
    const response = await api.get(`/users/getuser`)

   //  toast.success(response?.data?.message)
    return response?.data?.data

  } catch (error) {
    const msg = error?.response?.data?.error ||
                error?.response?.data?.error ||
                "Something went wrong"
    toast.error(msg)
    console.log(error?.response?.data)
  }
}