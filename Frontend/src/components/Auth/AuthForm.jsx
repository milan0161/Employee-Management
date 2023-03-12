import { useContext, useState } from 'react';
import { login } from '../../API/auth/auth-service';
import AuthContext from '../../cotenxt_store/auth_context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(AuthContext);
    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        const data = { username: username, password: password };
        login(data).then((response) => {
            localStorage.setItem('token', response.token);
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            localStorage.setItem('expiration', expiration.toISOString());
            ctx.onLogin();
            setUsername('');
            setPassword('');
        });
    };

    return (
        <div className={classes['home_login']}>
            <h1>Welcome to our workpage</h1>
            <form onSubmit={loginHandler} className={classes['auth_form']}>
                <h4>Please log in to continue</h4>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        value={username}
                        onChange={usernameChangeHandler}
                        name="username"
                        type={'text'}
                        id="username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={passwordChangeHandler}
                        name="password"
                        type={'password'}
                        id="password"
                    />
                </div>
                <button>Log In</button>
            </form>
        </div>
    );
};

export default AuthForm;
