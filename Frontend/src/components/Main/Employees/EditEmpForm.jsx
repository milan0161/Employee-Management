import { useState } from 'react';
import classes from './EditEmpForm.module.css';
import { editEmployee } from '../../../API/employees/employees-service';

const EditEmpForm = ({ singleEmployee, onEditEmp }) => {
    
    const [firstname, setFirstname] = useState(singleEmployee.firstname);
    const [lastname, setLastname] = useState(singleEmployee.lastname);
    const [phoneNumber, setPhoneNumber] = useState(singleEmployee.phone_number);
    const [email, setEmail] = useState(singleEmployee.email);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(singleEmployee.birth_date).toISOString().substring(0,10));
    const [salary, setSalary] = useState(singleEmployee.monthly_salary);

    const firstnameHandler = (e) => {
        setFirstname(e.target.value);
    };

    const lastnameHandler = (e) => {
        setLastname(e.target.value);
    };

    const phoneNumberHaldner = (e) => {
        setPhoneNumber(e.target.value);
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const dateHandler = (e) => {
        setDateOfBirth(e.target.value);
    };

    const salaryHandler = (e) => {
        setSalary(e.target.value);
    };

    const editEmpHandler = (e) => {
        e.preventDefault();
        let data = {
            firstname: firstname,
            lastname: lastname,
            phone_number: phoneNumber,
            email: email,
            birth_date: dateOfBirth,
            monthly_salary: salary,
        };
        editEmployee(data, singleEmployee._id).then((data) => {
            onEditEmp(data.employee);
            setFirstname('');
            setLastname('');
            setPhoneNumber('');
            setEmail('');
            setDateOfBirth('');
            setSalary('');
        });
    };

    return (
        <form onSubmit={editEmpHandler} className={classes['emp_form']}>
            <h3>Edit Employee</h3>
            <div>
                <label htmlFor="firstname">First Name:</label>
                <input
                    value={firstname}
                    onChange={firstnameHandler}
                    type={'text'}
                    name="firstname"
                    id="firstname"
                />
            </div>
            <div>
                <label htmlFor="lastname">Last Name:</label>
                <input
                    value={lastname}
                    onChange={lastnameHandler}
                    type={'text'}
                    name="lastname"
                    id="lastname"
                />
            </div>
            <div>
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    value={phoneNumber}
                    onChange={phoneNumberHaldner}
                    type={'text'}
                    id="phone_number"
                    name="phone_number"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    value={email}
                    onChange={emailHandler}
                    type={'email'}
                    id="email"
                    name="email"
                />
            </div>
            <div>
                <label htmlFor="birth_date">Date of Birth:</label>
                <input
                    value={dateOfBirth}
                    onChange={dateHandler}
                    type={'date'}
                    id="birth_date"
                    name="birth_date"
                />
            </div>
            <div>
                <label htmlFor="salary">Salary:</label>
                <input
                    value={salary}
                    onChange={salaryHandler}
                    type={'number'}
                    id="salary"
                    name="monthly_salary"
                />
            </div>
            <button>submit</button>
        </form>
    );
};

export default EditEmpForm;
