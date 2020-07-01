const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const cors = require('cors')
const express = require('express')
const logger = require('../utils/logger')

blogsRouter.use(cors())
blogsRouter.use(express.json())

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => logger.error(error))
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => logger.error(error))
})

module.exports = blogsRouter