const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.use(cors())
blogsRouter.use(express.json())



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!request.token || !jwt.verify(request.token, process.env.SECRET).id) {
        return response.status(401).json({ error: 'token missing or invalid' })  }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    if (!body.title && !body.url) {
        return response.status(400).end()
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id ? user._id : (await User.findOne()).toJSON().id
    })
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(request.params.id)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }else if (decodedToken.id.toString() !== blogToDelete.user.toString()) {
        return response.status(403).end()
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
    const updatedBlog = {
        title: request.body.title ? request.body.title : blog.title,
        author: request.body.author ? request.body.title : blog.author,
        url: request.body.url ? request.body.url : blog.url,
        likes: request.body.likes || request.body.likes === 0 ? request.body.likes : blog.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter