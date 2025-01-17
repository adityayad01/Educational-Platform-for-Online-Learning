const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')

dotenv.config()
mongoose.connect(process.env.MONGODB_CONNECTION).then(() => console.log('Database connected...')).catch((err) => {
    console.log(err);
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.listen(5001, () => {
    console.log('Server is running on port 5001');
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


module.exports = app;