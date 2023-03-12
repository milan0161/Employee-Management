const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashedPw = await bcrypt.hash(password, 12)
        const admin = new Admin({
            username: username,
            email: email,
            password: hashedPw,

        });
        await admin.save();
        res.status(201).json({ message: 'Admin creted', })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};


const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const admin = await Admin.findOne({ username: username })
        if (!admin) {
            const error = new Error('Wrong username')
            error.statusCode = 401;
            throw error

        }
        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            const error = new Error('Wrong password')
            error.statusCode = 401;
            throw error
        }

        const token = jwt.sign(
            {
                username: admin.username,
                adminId: admin._id.toString()
            },
            'mhakq00zsyf739hl9ayj16gri9sgsgz',
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({ token: token, adminId: admin._id.toString() })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}



module.exports = {
    signup,
    login
}