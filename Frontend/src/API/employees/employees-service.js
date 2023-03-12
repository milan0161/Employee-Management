
import axiosInstance from "../axios/axios-instance";
import { showErrorMessage, showSuccess } from "../../utils/toast-message";

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;
const basePath = `${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/employee/api/v1`;

export const fetchEmps = async () => {

    try {
        const response = await axiosInstance.get(`${basePath}/get-all-employees`, { authorization: true });
        if (response.status === 200) {
            return Promise.resolve(response.data);
        };
    } catch (error) {
        showErrorMessage('Could not get employees from the server!');
        return Promise.reject(error);
    }

};


export const addEmployee = async (emp) => {
    try {
        const response = await axiosInstance.post(`${basePath}/create-employee`, emp, { authorization: true });

        if (response.status === 201) {
            showSuccess('Employee created !')
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not create employee!')
        }

    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }

};

export const editEmployee = async (emp, empId) => {
    try {
        const response = await axiosInstance.patch(`${basePath}/update-employee/${empId}`, emp, { authorization: true });
        
        if (response.status === 200) {
            showSuccess(response.data.message)
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not update employee');
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    };
};

export const deleteEmployee = async (empId) => {
    try {
        const response = await axiosInstance.delete(`${basePath}/delete-employee/${empId}`, { authorization: true });
        if(response.status === 200){
            showSuccess(response.data.message)
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not delete Employee')
        }
    } catch (error){
        showErrorMessage(error)
        return Promise.reject(error)
    }   
}


