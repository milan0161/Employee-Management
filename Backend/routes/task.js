const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/isAuth')

const {createTask, deleteTask, getAllTasks, getSingleTask, updateTask} = require('../controllers/task')


//Method "POST" => http://localhost:7000/task/api/v1/create-task
router.post('/api/v1/create-task', isAuth,createTask);


//Method "DELETE" => http://localhost:7000/task/api/v1/delete-task/:id
router.delete('/api/v1/delete-task/:id',isAuth ,deleteTask);

//Method "GET" => http://localhost:7000/task/api/v1/get-all-tasks
router.get('/api/v1/get-all-tasks', isAuth,getAllTasks);


//Method "GET" => http://localhost:7000/task/api/v1/get-single-task/:id
router.get('/api/v1/get-single-task/:id', isAuth,getSingleTask);


//Method "PATCH" => http://localhost:7000/task/api/v1/update-task/:id
router.patch('/api/v1/update-task/:id', isAuth,updateTask);



module.exports = router