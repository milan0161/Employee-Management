import { useState } from 'react';
import { completeTask } from '../../../API/tasks/completed-task-service';
import { deleteTask } from '../../../API/tasks/tasks-service';
import classes from './SingleTask.module.css';

const SingleTask = (props) => {
    const [date, setDate] = useState('');

    const dateChangeHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const deleteTaskHandler = () => {
        let confirm = window.confirm(`Are you sure you want to delete task ${props.title}?`);
        if (!confirm) {
            return;
        }
        deleteTask(props._id).then(() => {
            props.onDelete(props._id);
        });
    };

    const completeTaskHandler = (e) => {
        e.preventDefault();
        completeTask(date, props._id).then(() => {
            props.onDelete(props._id);
        });
    };

    const showFormHandler = () => {
        props.onShowEdit();
        props.onEdit(props.title, props.description, props.due_date, props._id);
    };

    return (
        <li>
            <p>{props.title}</p>
            <p>{props.description}</p>
            <div className={classes['emp_div']}>
                <span>First name: {props.firstname} </span>
                <span>Last Name: {props.lastname} </span>
               
            </div>
            <div className={classes['date_div']}>
                Due Date: {new Date(props.due_date).toLocaleDateString()}
                <form className={classes['complete_tas_form']} onSubmit={completeTaskHandler}>
                    <input value={date} onChange={dateChangeHandler} type={'date'} name="date" />
                    <button>Complete Task</button>
                </form>
            </div>
            <div className={classes['list_btn_div']}>
                <button onClick={deleteTaskHandler}>Delete</button>
                <button onClick={showFormHandler}>Edit</button>
            </div>
        </li>
    );
};

export default SingleTask;
