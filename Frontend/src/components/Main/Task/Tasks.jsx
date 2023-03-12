import { useContext, useEffect, useState } from 'react';
import EmpContext from '../../../cotenxt_store/emp_context';
import SingleTask from './SingleTask';
import AddTask from './AddTask';
import classes from './Tasks.module.css';
import { editTask, fetchAllTasks } from '../../../API/tasks/tasks-service';
import { fetchEmps } from '../../../API/employees/employees-service';

const Tasks = () => {
    const empCtx = useContext(EmpContext);
    const employees = empCtx.employees;
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [showEdit, setShowEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [taskId, setTaskId] = useState('');
    const [assignee, setAssignee] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);
    const [showTasks, setShowTasks] = useState(true);
    const [maxPages, setMaxPages] = useState();

    useEffect(() => {
        fetchAllTasks(page).then((data) => {
            setTasks(data.tasks);
            setMaxPages(data.totalPages);
        });
        fetchEmps().then((data) => empCtx.setEmps(data.employees));
    }, [page, maxPages]);

    useEffect(() => {
        if (tasks.length === 0) {
            setShowTasks(false);
        } else {
            setShowTasks(true);
        }
    }, [tasks]);

    const prevPageHandler = () => {
        if (page > 1) {
            setPage((prevPage) => {
                return prevPage - 1;
            });
        } else {
            return;
        }
    };

    const nextPageHandler = () => {
        setPage((prevPage) => {
            return prevPage + 1;
        });
    };

    const onDeleteHandler = (id) => {
        setTasks((prevState) => {
            return prevState.filter((task) => task._id !== id);
        });
    };

    const onShowEditHandler = () => {
        setShowEdit((prev) => !prev);
        setShowAddTask(false);
    };

    const onShowAddTaskHandler = () => {
        setShowAddTask((prev) => !prev);
        setShowEdit(false);
    };

    const onEditHandler = (title, description, date, _id) => {
        setTitle(title);
        setDescription(description);
        setDate(date);
        setTaskId(_id);
    };
    const onChangeTitleHandler = (e) => {
        setTitle(e.target.value);
    };

    const onChangeDescriptionHandler = (e) => {
        setDescription(e.target.value);
    };
    const onChangeAssigneeHandler = (e) => {
        setAssignee(e.target.value);
    };
    const onChangeDateHandler = (e) => {
        setDate(e.target.value);
    };

    const onAddTaskHandler = (newtask) => {
        setTasks((prevTasks) => {
            return [...prevTasks, newtask];
        });
    };
    const editTaskHandler = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            assignee: assignee.toString(),
            due_date: date,
        };
        editTask(data, taskId).then((data) => {
            let newTasks = tasks.slice();
            const newState = newTasks.map((obj) => {
                if (obj._id === taskId) {
                    return data.task;
                }
                return obj;
            });
            setTasks(newState);
            setTitle('');
            setDescription('');
            setAssignee('');
            setDate('');
        });
    };
    return (
        <div className={classes['main_tasks_div']}>
            <h2>All Tasks</h2>
            <div className={classes['add_task_div']}>
                <button onClick={onShowAddTaskHandler} type="button">
                    Add new Task
                </button>
            </div>
            <ul className={classes['tasks_list']}>
                {tasks.map((task) => (
                    <SingleTask
                        key={task._id}
                        _id={task._id}
                        title={task.title}
                        description={task.description}
                        firstname={task.assignee.firstname}
                        lastname={task.assignee.lastname}
                        email={task.assignee.email}
                        due_date={new Date(task.due_date).toISOString().substring(0, 10)}
                        onDelete={onDeleteHandler}
                        onShowEdit={onShowEditHandler}
                        onEdit={onEditHandler}
                    />
                ))}
            </ul>
            {!showTasks && <h2> There are no available tasks</h2>}
            {showTasks && (
                <div className={classes['page_btn_div']}>
                    <button onClick={prevPageHandler}>PrevPage</button>
                    <span>{page}</span>
                    {page !== maxPages && <span>{page + 1}</span>}
                    <button disabled={page + 1 > maxPages} onClick={nextPageHandler}>
                        NextPage
                    </button>
                </div>
            )}
            {showEdit && (
                <div className={classes['edit_task_div']}>
                    <h3>Edit Task</h3>
                    <form onSubmit={editTaskHandler} className={classes['edit_form']}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                onChange={onChangeTitleHandler}
                                value={title}
                                type={'text'}
                                id="title"
                                name="title"
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                onChange={onChangeDescriptionHandler}
                                value={description}
                                type={'text'}
                                id="description"
                                name="description"
                            />
                        </div>
                        <div>
                            <label htmlFor="assignee">Assignee:</label>
                            <select
                                id="assignee"
                                name={'assignee'}
                                onChange={onChangeAssigneeHandler}
                            >
                                {employees.map((emp) => (
                                    <option
                                        key={emp._id}
                                        value={emp._id}
                                    >{`${emp.firstname} ${emp.lastname}`}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="due_date">Due Date</label>
                            <input
                                value={date}
                                onChange={onChangeDateHandler}
                                type={'date'}
                                id="due_date"
                                name="due_date"
                            />
                        </div>
                        <div className={classes['edit_btn_div']}>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            )}
            {showAddTask && <AddTask onAddTask={onAddTaskHandler} emps={employees} />}
        </div>
    );
};

export default Tasks;
