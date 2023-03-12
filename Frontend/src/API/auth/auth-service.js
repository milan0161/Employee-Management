import axiosInstance from "../axios/axios-instance";
import { showErrorMessage, showSuccess } from "../../utils/toast-message";

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;
const basePath = `${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/admin/api/v1`;



export const login = async (data) => {

    try {
        const response = await axiosInstance.post(`${basePath}/signin`, data, { authorization: false });
        if (response.status !== 200) {
            throw new Error('Wrong Credentials');

        } else {
            showSuccess('Welcome to our page');
            return Promise.resolve(response.data)
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
};