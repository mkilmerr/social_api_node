const { getPost, createPost, postsByUser, deletePost, updatePost } = require('../controllers/post')
const { createPostValidator } = require('../validator')
const { requireSignin } = require('../controllers/auth')
const uploadPhoto  = require('../upload/upload')
const express = require('express')
const routes = new express.Router
const multer = require('multer')
const upload = multer(uploadPhoto)

routes.get('/',requireSignin,getPost)
routes.post('/post', upload.single('image'),requireSignin, createPostValidator,createPost)
routes.get('/posts/by/:id',requireSignin, postsByUser)
routes.delete('/post/:id',requireSignin, deletePost)
routes.put('/post/:id',upload.single('image'),requireSignin, updatePost)
module.exports = routes