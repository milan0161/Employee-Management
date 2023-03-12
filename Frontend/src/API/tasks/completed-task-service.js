

import axiosInstance from "../axios/axios-instance";

import { showErrorMessage, showSuccess } from "../../utils/toast-message";

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env
const basePath = `${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/completedTask/api/v1`


export const getTopEmployees = async () => {

    try {
        const response = await axiosInstance.get(`${basePath}/get-employees`, { authorization: true });
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not fetch top five employees from the server')
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
};

export const getAllEmps = async () => {
    try {
        const response = await axiosInstance.get(`${basePath}/get-all-employees`, { authorization: true });
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not fetch top five employees from the server');
        };
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    };
};

export const getCompletedTasks = async () => {

    try {
        const response = await axiosInstance.get(`${basePath}/get-completed-tasks`, {
            authorization: true
        });
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not fetch completed tasks from the server');
        };
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    };

};

export const completeTask = async (date, taskId) => {
    try {
        const response = await axiosInstance.post(`${basePath}/complete-task/${taskId}`, { date: date }, { authorization: true })
        if (response.status === 201) {
            showSuccess('Task is solved');
            return Promise.resolve(response.data)
        } else {
            throw new Error('Cant do that action');
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
};

