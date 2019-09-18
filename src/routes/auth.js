const { signup, signin, signout } = require('../controllers/auth')
const { userSignupValidator } = require('../validator/index')
const express = require('express')
const routes = new express.Router

routes.post('/signup',userSignupValidator,signup)
routes.post('/signin', signin)
routes.get('/signout', signout)
module.exports = routes