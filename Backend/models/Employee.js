const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Employees first name must be provided']
    },
    lastname: {
        type: String,
        required: [true, 'Employees last name must be provided']
    },
    phone_number: {
        type: String,
        required: [true, 'Employees phone number must be provided']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    birth_date: {
        type: Date,
        required: [true, 'Emloyees date of birth must be provided']
    },
    monthly_salary: {
        type: Number,
        required: [true, `Employees monthly salary must be provided`]
    }
}, {timestamps: true})


module.exports = mongoose.model('Employee', employeeSchema)