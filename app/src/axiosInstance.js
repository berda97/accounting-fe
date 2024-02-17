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
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response);

        switch (response.status) {
            case 200:
                return response;
            case 401:
                localStorage.removeItem("token");
                return Promise.reject(response);
            // case 300:
            //     return response;
        }
    },
    (error) => {
        localStorage.removeItem("token");
        return Promise.reject(error);
    }
);
export default axiosInstance;