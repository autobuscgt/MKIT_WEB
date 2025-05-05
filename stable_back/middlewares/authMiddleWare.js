require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({message: 'Не авторизован - нет заголовка Authorization'})
        }
        const token = authHeader.split(' ')[1] 
        
        if (!token) {
            return res.status(401).json({message: 'Не авторизован - нет токена'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Не авторизован - ошибка проверки токена'})
    }
}