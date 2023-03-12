import { useState } from 'react';
import { addEmployee } from '../../../API/employees/employees-service';
import classes from './AddEmpForm.module.css';

const AddEmpForm = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [salary, setSalary] = useState('');

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

    const addEmployeeHandler = (e) => {
        e.preventDefault();
        let data = {
            firstname: firstname,
            lastname: lastname,
            phone_number: phoneNumber,
            email: email,
            birth_date: dateOfBirth,
            monthly_salary: salary,
        };
        addEmployee(data).then((data) => {
            props.onAddEmp(
                firstname,
                lastname,
                phoneNumber,
                email,
                dateOfBirth,
                salary,
                data.eployee._id
            );
            setFirstname('');
            setLastname('');
            setPhoneNumber('');
            setEmail('');
            setDateOfBirth('');
            setSalary('');
        });
    };

    return (
        <form onSubmit={addEmployeeHandler} className={classes['emp_form']}>
            <h3>Add Employee</h3>
            <div>
                <label htmlFor="firstname">First Name:</label>
                <input
                    onChange={firstnameHandler}
                    value={firstname}
                    type={'text'}
                    name="firstname"
                    id="firstname"
                />
            </div>
            <div>
                <label htmlFor="lastname">Last Name:</label>
                <input
                    onChange={lastnameHandler}
                    value={lastname}
                    type={'text'}
                    name="lastname"
                    id="lastname"
                />
            </div>
            <div>
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    onChange={phoneNumberHaldner}
                    value={phoneNumber}
                    type={'text'}
                    id="phone_number"
                    name="phone_number"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    onChange={emailHandler}
                    value={email}
                    type={'email'}
                    id="email"
                    name="email"
                />
            </div>
            <div>
                <label htmlFor="birth_date">Date of Birth:</label>
                <input
                    onChange={dateHandler}
                    value={dateOfBirth}
                    type={'date'}
                    id="birth_date"
                    name="birth_date"
                />
            </div>
            <div>
                <label htmlFor="salary">Salary:</label>
                <input
                    onChange={salaryHandler}
                    value={salary}
                    type={'number'}
                    id="salary"
                    name="monthly_salary"
                />
            </div>
            <button>submit</button>
        </form>
    );
};

export default AddEmpForm;
