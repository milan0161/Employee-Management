import { NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import AuthContext from '../../cotenxt_store/auth_context';
import { useContext } from 'react';

const NavigationBar = () => {
    const ctx = useContext(AuthContext);
    const logoutHandler = () => {
        ctx.onLogout();
    };

    return (
        <ul className={classes['nav_bar']}>
            <li>
                <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'/'}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'employee'}
                >
                    Employees
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'tasks'}
                >
                    Tasks
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'completed-tasks'}
                >
                    Completed Tasks
                </NavLink>
            </li>
            <button className={classes['logout_btn']} onClick={logoutHandler}>Log Out</button>
        </ul>
    );
};

export default NavigationBar;
