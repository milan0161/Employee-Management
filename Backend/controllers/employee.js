const Employee = require('../models/Employee');


const createEmploye = async (req, res, next) => {
    const {firstname, lastname, email, phone_number, birth_date, monthly_salary} = req.body
    
    try {
        const employee = new Employee({
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            email: email,
            birth_date: birth_date,
            monthly_salary: monthly_salary
        })
        const result = await employee.save()
        res.status(201).json({eployee: result})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }

};

const getSingleEmploye = async (req, res, next) => {
    const empId = req.params.id;
    try {
        
        const employee = await Employee.findById({_id:empId})
        if(!employee){
            const error = new Error('Cant find employee')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({employee: employee})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
}

const deleteEmployee = async(req, res, next) => {
    const emId = req.params.id;
    try {
        const employee = await Employee.findById({_id: emId})
        
        if(!employee){
            const error = new Error('Cant find employee')
            error.statusCode = 404;
            throw error
        }
        await Employee.findByIdAndRemove(emId)
        res.status(200).json({message: 'Employee Deleted'})
        
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
}


const getEmployees = async (req, res, next) => {
    try {
        const totalEmployees  = await Employee.find().countDocuments()
        const employees = await Employee.find()
        if(!employees){
            const error = new Error('Cant find employees')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({employees: employees, total: totalEmployees})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
};


const updateEmployee = async (req, res, next) => {
    const empId = req.params.id;
    const {firstname, lastname, email, phone_number, birth_date, monthly_salary} = req.body
    try {
        let employee = await Employee.findById(empId)
        if(!employee){
            const error = new Error('Cant find employee')
            error.statusCode = 404;
            throw error
        }
        if(firstname){
            employee.firstname = firstname
        } 
        if(lastname){
            employee.lastname = lastname
        } 
        if(phone_number){
            employee.phone_number = phone_number
        } 
        if(email){
            employee.email = email
        }
        if(birth_date){
            employee.birth_date = birth_date
        }
        if(monthly_salary){
            employee.monthly_salary = monthly_salary
        }
        await employee.save()
        res.status(200).json({message: 'Employee updated', employee: employee})

    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
}

module.exports = {
    createEmploye,
    getSingleEmploye,
    deleteEmployee,
    getEmployees,
    updateEmployee
}


