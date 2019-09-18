const User = require('../models/user')
const Post = require('../models/post')

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('name email')
    return res.send(user)
}

exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    console.log(req.profile)
    return res.json({users})
}

exports.userUpdate = async (req, res) => {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, { $set: req.body}).select('_id name email')
    if(user!= null)
        return res.json({user})
    return res.json({user: "User not found!"})
}

exports.userDelete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user!= null)
        return res.json({message : 'User deleted!'})
    return res.json({message : 'User not found!'})
}
