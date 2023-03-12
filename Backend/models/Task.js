const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type: String,
        required:[true, 'title must be provided']
    },
    description: {
        type: String,
        required: [true, 'Description must be provided']
    },
    assignee:{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    due_date:{
        type: Date,
        required: true
    }
},{timestamps: true});


module.exports = mongoose.model('Task', taskSchema)