const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const middleware = require('./utils/middleware')


morgan.token('content', function getBody(req) {
    if(req.method === 'POST'){
        return(JSON.stringify(req.body))}
    return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use('/api/blogs', blogsRouter)

app.use(cors())
app.use(express.static('build'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app