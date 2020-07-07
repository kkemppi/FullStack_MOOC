const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.passwordHash.length < 3) {
        return response.status(400).json({ error: 'invalid password' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)

    const user = new User({
        username: body.username,
        passwordHash: passwordHash,
        name: body.name,
        blogs: body.blogs ? body.blogs : []
    })

    await user.save()

    response.json(user)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter