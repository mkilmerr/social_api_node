const Post = require('../models/post')
const path = require('path')
const sharp = require('sharp')
const fs = require('fs')
const mongoose = require('mongoose')

exports.getPost = async(req, res) => {
    try{
        const posts = await Post.find().populate('postedBy','_id name').select('_id title body postedBy image').sort('-createdAt');
        res.json({posts})
    } catch (err) {
        console.log(err);
    }
}


exports.createPost = async (req, res) => {
   const {title, body} = req.body
   const { filename } = req.file
   const postedBy = req.session.profile
   
   const fileName = filename.split('.')
   const image = `${fileName[0]}.jpg`

   uploadImage(req,image)

    const post = await Post.create({
        title,
        body,
        image,
        postedBy
    })

    res.status(200).json({post})
   console.log(req.session.profile)
}


exports.postsByUser = async (req, res) => {
    const postUser = await Post.find({postedBy:req.params.id}).sort('-createdAt')

    if(!postUser)
        return res.json({message:'User not have a post!'})

    return res.json({posts : postUser})
}

exports.deletePost = async (req, res) => {
    const post = await Post.findOneAndDelete(req.params.id)
    
    if(!post)
        return res.json({error : 'Post not found!'})
    
    return res.json({message : 'Post deleted success!'})
}


exports.updatePost = async (req, res) => {
    const postImage = await Post.findById(req.params.id)
    const convert = postImage.image.toString()
    const {title, body} = req.body
    const { filename } = req.file
    const id = req.params.id
    const fileName = filename.split('.')
    const image = `${fileName[0]}.jpg`

    fs.unlinkSync(path.resolve(req.file.destination,'resized',convert))

    uploadImage(req,image)
    const post = await Post.findByIdAndUpdate(id,{title,body,image})

    if(!post)
        return res.status(400).json({error : 'Post not found!'})

    return res.json({message : 'Post updated!'})

} 

const uploadImage = async (req, image) => {
    
   await sharp(req.file.path)
   .resize(500)
   .jpeg({quality: 50})
   .toFile(
       path.resolve(req.file.destination,'resized',image)
   )
   
    fs.unlinkSync(req.file.path)

}