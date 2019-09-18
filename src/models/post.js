const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required : 'Title is required',
        minlength : 4,
        maxlength : 150
    },
    body : {
        type: String,
        required: 'Body of post is required',
        minlength: 4,
        maxlength: 2000
    },
    image : {
        data: Buffer,
        contentType: String
    },
    postedBy : {
        type: ObjectId,
        ref: 'User'
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Post',postSchema)