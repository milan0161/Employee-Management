const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./Task')

const CompletedTasksSchema = new Schema({
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        require: true
    },
    task: Task.schema,
    date:{
        type: Date
    }
},{timestamps: true});


module.exports = mongoose.model('CompletedTask', CompletedTasksSchema);


