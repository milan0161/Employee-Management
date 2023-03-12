import { Outlet, useLoaderData } from "react-router-dom";
import NavigationBar from "../components/Navigation/NavigationBar";
import AuthContext from "../cotenxt_store/auth_context";
import AuthForm from "../components/Auth/AuthForm";
import { useContext } from "react";
import { useEffect } from "react";
import EmpContext from "../cotenxt_store/emp_context";
import { fetchEmps } from "../API/employees/employees-service";

const RootLayout = () => {
    const ctx = useContext(AuthContext)
    const isAuth = ctx.isAuth
    const empCtx = useContext(EmpContext)


    useEffect(() => {
        if (!isAuth) {
            return
        }
        fetchEmps().then(emps => empCtx.setEmps(emps.employees))

    }, []);

    return (
        <>
            {!ctx.isAuth && <AuthForm />}
            {ctx.isAuth && <NavigationBar />}
            {ctx.isAuth && <Outlet />}
        </>


    )
};

export default RootLayout;