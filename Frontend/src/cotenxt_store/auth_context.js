import React, { useState, useEffect } from "react";


const AuthContext = React.createContext({
    isAuth: false,
    onLogin: () => { },
    onLogout: () => { },

})


export const AuthContextProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false);

    const token = localStorage.getItem('token')
    const storedExpDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpDate);
    const now = new Date()
    const duration = expirationDate.getTime() - now.getTime()

    useEffect(() => {

        if (token && duration > 0) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
            localStorage.removeItem('token');
            localStorage.removeItem('expiration')
        }
    }, [token, duration])

    const onLoginHandler = () => {
        setIsAuth(true)
    };

    const onLogoutHandler = () => {
        localStorage.removeItem('token')
        setIsAuth(false)
    };
    return (
        <AuthContext.Provider value={{
            isAuth: isAuth,
            onLogin: onLoginHandler,
            onLogout: onLogoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext