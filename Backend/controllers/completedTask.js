const CompletedTask = require('../models/CompletedTask');
const Employee = require('../models/Employee');
const Task = require('../models/Task')



const taskIsCompleted = async (req, res, next) => {
    const taskId = req.params.id
    const { date } = req.body


    try {

        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('cant find task')
            error.statusCode = 404;
            throw error
        }

        const taskIsCompleted = new CompletedTask({
            employee: task.assignee,
            task: task,
            date: date
        })
        const result = await taskIsCompleted.save()
        await Task.findByIdAndRemove(taskId);
        res.status(201).json({ completedTask: result })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


const getCompletedTasks = async (req, res, next) => {
    try {
        const count = await CompletedTask.find().countDocuments()
        const completedTasks = await CompletedTask.find().populate('task').populate('employee')

        if (!completedTasks) {
            const error = new Error('No completed tasks yet')
            error.statusCode = 204;
            throw error
        }
        res.status(200).json({ tasks: completedTasks, count: count })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const getAllEmps = async (req, res, next) => {
    try {
        let employees = []
        const completedTasks = await CompletedTask.find().populate('employee');
        completedTasks.map(task => employees.push(task.employee.firstname));
        const counts = {};

        employees.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
        });
        let sorted = Object.keys(counts).sort((key1, key2) => counts[key2] - counts[key1]).reduce(
            (obj, key) => ({
                ...obj,
                [key]: counts[key]
            }),
            {}
        )
        res.status(200).json(sorted)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


const getEmployees = async (req, res, next) => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    date.setDate(1)
    const dateNow = new Date()
    dateNow.setDate(1)
    try {
        let employees = []
        const completedTasks = await CompletedTask.find({
            date: {
                $gte: date,
                $lte: dateNow
            }
        }).populate('employee');

        completedTasks.map(task => employees.push(task.employee.firstname))

        const counts = {};

        employees.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
        })

        let sorted = Object.keys(counts).sort((key1, key2) => counts[key2] - counts[key1]).reduce(
            (obj, key) => ({
                ...obj,
                [key]: counts[key]
            }),
            {}
        )

        const sliced = Object.fromEntries(
            Object.entries(sorted).slice(0, 5)
        )

        res.status(200).json(sliced)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    taskIsCompleted,
    getCompletedTasks,
    getEmployees,
    getAllEmps
}