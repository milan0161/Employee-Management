import axios from "axios";
import { getAuthToken } from "../../utils/get-auth";



const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.authorization !== false) {
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;