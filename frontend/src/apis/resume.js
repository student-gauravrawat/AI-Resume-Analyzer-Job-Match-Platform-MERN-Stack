import api from "../utils/axiosInterceptor";
import toast from "react-hot-toast";

export const uploadResume = async(file)=>{
  try {
    const response = await api.post(`/resumes/upload-resume`,
       file,
       {
        headers: {
          "Content-Type": "multipart/form-data"
         }
       }
    )

     toast.success(response?.data?.message)
     console.log(response?.data)
     return response?.data

  } catch (error) {
    const msg =  error?.response?.data?.error ||
                 error?.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
  }
}

export const getAllResume = async()=>{
  try {
    const response = await api.get(`/resumes/get-resume`)
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

export const deleteResume = async(id)=>{
  try {
    const response = await api.delete(`/resumes/delete/${id}`)
    toast.success(response?.data?.message)
    return response?.data
    
  } catch (error) {
    const msg =  error?.response?.data?.error ||
                 error?.response?.data?.message ||
                 "Something went wrong"
     toast.error(msg)
     console.log(error?.response?.data)
  }
}