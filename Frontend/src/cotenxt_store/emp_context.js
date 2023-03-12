import React, { useState } from "react";



const EmpContext = React.createContext({
    employees: [],
    setEmps: () => { }
})

export const EmpContextProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const setEmps = (emps) => {
        return setEmployees(emps)
    };



    return (
        <EmpContext.Provider value={{
            employees: employees,
            setEmps: setEmps
        }} >
            {props.children}
        </EmpContext.Provider>
    )


};

export default EmpContext