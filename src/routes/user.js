const express = require('express')
const routes = new express.Router
const { getAllUsers, getUser, userUpdate,userDelete, postsByUser } = require('../controllers/user')
const { requireSignin } = require('../controllers/auth')


routes.get('/user/:id', requireSignin, getUser)
routes.get('/users', requireSignin, getAllUsers)
routes.put('/user/:id', userUpdate)
routes.delete('/user/:id', userDelete)

module.exports  = routes