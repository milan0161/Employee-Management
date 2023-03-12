const express = require('express');
const router = express.Router()

const {signup, login} = require('../controllers/admin')

//Method post => http://localhost:7000/admin/api/v1/signup
router.post('/api/v1/signup', signup);

//Method post => http://localhost:7000/admin/api/v1/signin
router.post('/api/v1/signin', login)


module.exports = router;