import axiosInstance from "../axios/axios-instance";

import { showErrorMessage, showSuccess } from "../../utils/toast-message";

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env
const basePath = `${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/task/api/v1`


export const fetchAllTasks = async (page) => {
    try {
        const response = await axiosInstance.get(`${basePath}/get-all-tasks?page=${page}`, { authorization: true });
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not get tasks from the server')
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }

}

export const createTask = async (task) => {
    try {
        const response = await axiosInstance.post(`${basePath}/create-task`, task, { authorization: true });

        if (response.status === 201) {
            showSuccess('Task successfully created')
            return Promise.resolve(response.data)
        } else {
            throw new Error('Could not create task')
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
};

export const editTask = async (task, taskId) => {
    try {
        const response = await axiosInstance.patch(`${basePath}/update-task/${taskId}`, task, {authorization:true})
        if(response.status === 200){
            showSuccess(response.data.message)
            return Promise.resolve(response.data)
        } else {
            throw new Error ('Could not update task')
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`${basePath}/delete-task/${taskId}`, { authorization: true })
        if(response.status === 200){
            showSuccess(response.data.message)
            return 
        } else {
            throw new Error ('Could not delete Task')
        }
    } catch (error) {
        showErrorMessage(error)
        return Promise.reject(error)
    }
}