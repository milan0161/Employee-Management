const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')
const {createEmploye, getSingleEmploye, deleteEmployee, getEmployees, updateEmployee} = require('../controllers/employee')

//Method POST => http://localhost:7000/employee/api/v1/create-employee
router.post('/api/v1/create-employee', isAuth,createEmploye);

//Method GET => http://localhost:7000/employee/api/v1/get-single-employee/:id
router.get('/api/v1/get-single-employee/:id', isAuth,getSingleEmploye)

//Method DELETE => http://localhost:7000/employee/api/v1/delete-employee/:id
router.delete('/api/v1/delete-employee/:id', isAuth, deleteEmployee);


//Method GET => http://localhost:7000/employee/api/v1/get-all-employees
router.get('/api/v1/get-all-employees', isAuth,getEmployees)

//Method PATCH => http://localhost:7000/employee/api/v1/update-employee/:id
router.patch('/api/v1/update-employee/:id', isAuth,updateEmployee)


module.exports = router;