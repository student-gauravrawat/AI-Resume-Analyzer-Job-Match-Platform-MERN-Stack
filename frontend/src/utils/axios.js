import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3400/api/v1",
    withCredentials: true
})

export default api;