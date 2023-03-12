const jwt = require('jsonwebtoken');



const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated')
        error.statusCode = 401;
        throw error
    }
    const token = authHeader.split(' ')[1]
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'mhakq00zsyf739hl9ayj16gri9sgsgz');
        if (!decodedToken) {
            const error = new Error('Not authenticated')
            error.statusCode = 401;
            throw error
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
    next()
};


module.exports = isAuth;