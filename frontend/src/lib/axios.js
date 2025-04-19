import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ?   "https://chatty-app-84qw.onrender.com/api" : "/api",
    withCredentials: true,
})
