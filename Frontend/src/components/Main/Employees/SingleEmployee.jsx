import { deleteEmployee } from '../../../API/employees/employees-service';

const SingleEmployee = (props) => {
    

    const deleteHandler = (e) => {
        e.preventDefault();
       
        const confirm = window.confirm('Are you sure you want to delete this employee');
        if (!confirm) {
            return;
        }

        deleteEmployee(props._id).then((data) => {
            props.onDelete(props._id);
        });
    };
    const editHandler = (e) => {
        props.onShow(
            props.firstname,
            props.lastname,
            props.phone_number,
            props.email,
            props.birth_date,
            props.monthly_salary,
            props._id
        );
    };

    return (
        <>
            <tr>
                <td>{props.firstname}</td>
                <td>{props.lastname}</td>
                <td>{props.phone_number}</td>
                <td>{props.email}</td>
                <td>{props.birth_date}</td>
                <td>${props.monthly_salary}</td>
                <td>
                    <button onClick={deleteHandler}>Delete</button>
                    <button onClick={editHandler}>Edit</button>
                </td>
            </tr>
        </>
    );
};

export default SingleEmployee;
