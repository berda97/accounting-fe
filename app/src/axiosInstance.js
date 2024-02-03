import axios from "axios";
import { useAuth } from "./provider/authProvider";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
axiosInstance.interceptors.response.use((res) => {
    console.log(res);

    if (res.status === 200) {
        return res;
    } 
},
    (error) => {
        localStorage.removeItem("token");
        return Promise.reject(error);
    }
)
export default axiosInstance;