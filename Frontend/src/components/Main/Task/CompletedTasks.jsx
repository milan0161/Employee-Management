import { useEffect, useState } from "react";

import { getCompletedTasks } from "../../../API/tasks/completed-task-service";
import classes from './CompletedTasks.module.css'

const CompletedTasks = () => {
    
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        getCompletedTasks().then(data => setCompletedTasks(data.tasks))
    }, [completedTasks])
    

    

    return(
        <section className={classes['main_section']}>
            <div className={classes['task_div']}> 
                <h2>Completed Tasks</h2>
                <ul className={classes['title_list']}>
                    <li>Task Title:</li>
                    <li>Due Date:</li>
                    <li>Employee:</li>
                    <li>Task Solved:</li>
                </ul>
                <ul className={classes['task_list']}>
                    {completedTasks.map(task => (
                        <li key={task._id}>
                            <p>{`${task.task.title}`}</p>
                            <p> {new Date(task.task.due_date).toLocaleDateString()}</p>
                            <p>{`${task.employee.firstname} ${task.employee.lastname}`}</p>
                            <p>{new Date(task.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
};


export default CompletedTasks;