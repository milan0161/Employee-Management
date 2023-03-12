import { useContext, useEffect, useState } from 'react';
import { getAllEmps, getTopEmployees } from '../../API/tasks/completed-task-service';
import AuthContext from '../../cotenxt_store/auth_context';
import classes from './Home.module.css';




const Home = () => {
    const [data, setData] = useState([]);
    const [topEmps, setTopEmps] = useState([]);
    const authCtx = useContext(AuthContext);
    const isAuth = authCtx.isAuth;

    useEffect(() => {
        if (!isAuth) {
            return;
        }
        getTopEmployees().then((response) => setData(response));
        getAllEmps().then((response) => setTopEmps(response));
    }, []);

    let array = Object.entries(data);
    let topEmpsArray = Object.entries(topEmps);
    let number = 0;
    let num = 0;
    return (
        <>
            <h2 className={classes['home_title']}>Statistics</h2>
            <section className={classes['home_section']}>
                <div className={classes['top_employee_div']}>
                    <h3>Our most successfull employees in the previous month</h3>
                    <ul>
                        {array.map((emp) => (
                            <li key={emp[0]}>
                                <p>
                                    <span>{`${(number += 1)}. ${emp[0]}`}</span>
                                </p>{' '}
                                <p>{`Completed Tasks: ${emp[1]}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes['mvp_emp_div']}>
                    <h3>Our most successfull employees</h3>
                    <ul>
                        {topEmpsArray.map((emp) => (
                            <li key={emp[0]}>
                                <p>
                                    <span>{`${(num += 1)}. ${emp[0]}`}</span>
                                </p>{' '}
                                <p>{`Completed Tasks: ${emp[1]}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Home;
