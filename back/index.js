require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT
const sequelize = require('./config/database')
const models = require('./models/models')
const errorHandler = require('./middlewares/ErrorHanlingMiddleware')
const router = require('./routes/index')

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))
app.use('/api',router)

//Обработка ошибок
app.use(errorHandler)

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()