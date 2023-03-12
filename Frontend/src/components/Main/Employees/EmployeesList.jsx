import { useContext, useEffect, useState } from 'react';
import SingleEmployee from './SingleEmployee';
import classes from './EmployeesList.module.css';
import AddEmpForm from './AddEmpForm';
import EditEmpForm from './EditEmpForm';
import { fetchEmps } from '../../../API/employees/employees-service';
import AuthContext from '../../../cotenxt_store/auth_context';

const EmployeesList = () => {
   
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [singleEmployee, setSingleEmployee] = useState({});
    const authCtx = useContext(AuthContext);
    const isAuth = authCtx.isAuth
    

    useEffect(() => {
        if(!isAuth){
            return
        }
        fetchEmps().then((data) => {
            setEmployees(data.employees);

        });
    }, [isAuth]);

    const showChangeHandler = (e) => {
        e.preventDefault();
        setShowForm((prev) => !prev);
        setShowEditForm(false);
    };

    const onShowHandler = (firstname, lastname, phone, email, birth_date, salary, _id) => {
        if (showEditForm === false) {
            setSingleEmployee({
                firstname: firstname,
                lastname: lastname,
                phone_number: phone,
                email: email,
                birth_date: birth_date,
                monthly_salary: salary,
                _id: _id,
            });
        }

        setShowEditForm((prev) => !prev);
        setShowForm(false);
    };

    const onAddEmpHandler = (
        firstname,
        lastname,
        phone_number,
        email,
        birth_date,
        monthly_salary,
        _id
    ) => {
        setEmployees((prevEmp) => {
            return [
                ...prevEmp,
                { firstname, lastname, phone_number, email, birth_date, monthly_salary, _id },
            ];
        });
    };

    const onEditEmpHandler = (emp) => {
        const copiedEmps = employees.slice()
        let newState = copiedEmps.map(obj => {
            if(obj._id === emp._id){
                return emp
            }
            return obj
        });
        setEmployees(newState)
    }

    const onDeleteHandler = (id) => {
        setEmployees((prevState) => {
            return prevState.filter((emp) => emp._id !== id);
        });
    };
    return (
        <div className={classes['emp_div']}>
            <h2>Our Employees</h2>
            <div className={classes['add_emps_div']}>
            <button className={classes['add_emps_btn']} onClick={showChangeHandler}>Add Employee</button>
            </div>
            <table className={classes['emp_table']}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Birth Date</th>
                        <th>Salary</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <SingleEmployee
                            key={emp._id}
                            _id={emp._id}
                            firstname={emp.firstname}
                            lastname={emp.lastname}
                            phone_number={emp.phone_number}
                            email={emp.email}
                            birth_date={new Date(emp.birth_date).toLocaleDateString()}
                            monthly_salary={`${emp.monthly_salary}`}
                            onShow={onShowHandler}
                            onDelete={onDeleteHandler}
                        />
                    ))}
                </tbody>
            </table>
            <div className={classes['add_emp_div']}>
                {showForm && <AddEmpForm onAddEmp={onAddEmpHandler} />}
                {showEditForm && <EditEmpForm singleEmployee={singleEmployee} onEditEmp={onEditEmpHandler} />}
            </div>
        </div>
    );
};

export default EmployeesList;
