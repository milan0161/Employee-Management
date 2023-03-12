import { useState } from 'react';
import { createTask } from '../../../API/tasks/tasks-service';

import classes from './AddTask.module.css'

const AddTask = (props) => {
    const {emps} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [assignee, setAssignee] = useState('')
    const [date, setDate] = useState('')

    const onTitleChangeHandler = (e) => {
        setTitle(e.target.value)
    }
    const onDescChangeHandler = (e) => {
        setDescription(e.target.value)
    }
    const onAssigneeChangeHandler = (e) => {
        setAssignee(e.target.value)
    }
    const onDateChangeHandler = (e) => {
        setDate(e.target.value)
        
    };
    
    const addTaskHandler = (e) => {
        e.preventDefault()
        const data = {
            title:title,
            description:description,
            assignee: assignee,
            due_date: new Date(date)
        }
        createTask(data).then(data => {
            
            props.onAddTask(data.task)
        })
       
    };
    
    return (
        <div className={classes['add_task_div']}>
            <h3>Add new Task</h3>
        <form onSubmit={addTaskHandler} className={classes['add_task_form']}>
            <div>
                <label>Title:</label>
                <input value={title} onChange={onTitleChangeHandler} type={'text'} id='title' name="title"/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea value={description} onChange={onDescChangeHandler} id="description" name="description"/>
            </div>
            <div>
                <label htmlFor="assignee">Assignee:</label>
                <select value={assignee} onChange={onAssigneeChangeHandler} id="assignee" name="assignee">
                    {emps.map(emp => (
                       <option key={emp._id} value={emp._id}>{`${emp.firstname} ${emp.lastname}`}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="date">Date:</label>
                <input value={date} onChange={onDateChangeHandler} type={'date'} name="due_date" id="date"/>
            </div>
            <div className={classes['btn_div']}>
                <button>Submit</button>
            </div>
        </form>
        </div>
    )
};


export default AddTask