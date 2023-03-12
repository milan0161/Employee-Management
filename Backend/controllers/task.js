const Task = require('../models/Task');


const createTask = async (req, res, next) => {
    const { title, description, assignee, due_date } = req.body;
    let date = new Date(due_date).toLocaleDateString()
    try {
        const task = new Task({
            title: title,
            description: description,
            assignee: assignee,
            due_date: date
        })
        await task.save()
        const newTask = await Task.find({
            title:title,
            description:description,
            assignee:assignee,
            due_date:date
        }).populate('assignee')
        res.status(201).json({ task: newTask[0] })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
const getSingleTask = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId)
        if (!task) {
            const error = new Error('Task cant be found')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({ task: task })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
};

const getAllTasks = async (req, res, next) => {
    const currentPage = req.query.page || 1
    const perPage = 5
    try {
        const count = await Task.find().countDocuments()
        const tasks = await Task.find()
        .sort({due_date: 1})
        .populate('assignee')
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        if (!tasks) {
            const error = new Error('No tasks found')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({ tasks: tasks, count: count, totalPages: Math.ceil(count / perPage) })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        };
        next(error)

    }
}

const updateTask = async (req, res, next) => {
    const { title, description, due_date, assignee } = req.body
    const taskId = req.params.id
    const date = new Date(due_date).toLocaleDateString()
    try {
        const task = await Task.findById(taskId).populate('assignee')
        if (!task) {
            const error = new Error('Task cant be found')
            error.statusCode = 404;
            throw error
        }
        if (title) {
            task.title = title
        }
        if( description ){
            task.description = description
        }
        if( due_date ){
            task.due_date = date
        }
        if( assignee ){
            task.assignee = assignee
        }
        await (await task.save()).populate('assignee');
        res.status(200).json({message: 'task updated', task: task})
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        };
        next(error)

    }
};
const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Cant find task')
            error.statusCode = 404;
            throw error
        }
        await Task.findByIdAndRemove(taskId);

        res.status(200).json({ message: 'Task deleted' })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};


module.exports = {
    createTask,
    deleteTask,
    getSingleTask,
    getAllTasks,
    updateTask
}