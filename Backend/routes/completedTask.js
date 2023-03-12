
const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/isAuth')
const {taskIsCompleted, getCompletedTasks, getEmployees, getAllEmps} = require('../controllers/completedTask');

//Method "POST" http://localhost7000/completedTask/api/v1/complete-task/:id
router.post('/api/v1/complete-task/:id', isAuth, taskIsCompleted);

//Method "GET" http://localhost7000/completedTask/api/v1/get-completed-tasks
router.get('/api/v1/get-completed-tasks', isAuth, getCompletedTasks);

//Method "GET" http://localhost7000/completedTask/api/v1/get-employees
router.get('/api/v1/get-employees', isAuth, getEmployees);

router.get('/api/v1/get-all-employees', isAuth, getAllEmps)

module.exports = router;