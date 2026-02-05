import api from "./axios"

api.interceptors.response.use(
    (response)=> response,
    async(error)=>{
        const originalRequest = error.config;

        if(error.response.status === 401 && originalRequest._retry){
            originalRequest._retry = true;
           try {
             await api.post("/users/refresh-token")
             return api(originalRequest)

           } catch (error) {
             window.location.href = "/login"
             return Promise.reject(error)
           }
        }
        return Promise.reject(error);
    }
)

export default api;