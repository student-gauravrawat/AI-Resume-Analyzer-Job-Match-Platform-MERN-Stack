import api from "../utils/axiosInterceptor";
import toast from "react-hot-toast";

export const matchResumeWithJob = async(data)=>{
  try {
   const response = await api.post(`/jobMatch/match`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    toast.success(response?.data?.message)
    return response?.data?.data

  } catch (error) {
    const msg =  error?.response?.data?.error ||
                 error?.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
  }
}

export const getJobMatchHistory = async()=>{
  try {
   const response = await api.get(`/jobMatch/history`)
    // toast.success(response?.data?.message)
    return response?.data?.data

  } catch (error) {
    const msg =  error?.response?.data?.error ||
                 error?.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
  }
}

export const getSingleJobMatch = async(id)=>{
  try {
    const response = await api.get(`/jobMatch/singleJobMatchResult/${id}`)
    // toast.success(response?.data?.message)
    return response?.data?.data
    
  } catch (error) {
    const msg =  error?.response?.data?.error ||
                 error?.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
  }
}

