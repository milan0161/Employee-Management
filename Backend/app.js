const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const errorhandler = require('./middleware/errorhandler')

const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const taskRoutes = require('./routes/task')
const completedTaskRoutes = require('./routes/completedTask')
//cors options
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(express.json());



app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);
app.use('/task', taskRoutes);
app.use('/completedTask', completedTaskRoutes)

const port = process.env.PORT || 7000;

app.use(errorhandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on ${port}...`))
    } catch (err) {
        console.log(err);
    }
};


start()
