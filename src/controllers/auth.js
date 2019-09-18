const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

exports.signup = async (req, res) => {
    const { email, name, password} = req.body
    const userExists = await User.findOne({ email : req.body.email})
    
    if (userExists)
        return res.status(403).json({error : 'Email is taken!'})
    
    const user = await User.create({
        email,name,password
    })
    req.session.profile = user
    return res.status(200).json({user})
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({email},(error, user) => {

        if(error || !user)
            return res.status(401).json({
                error : "User that does exists.Please signin!"
            })
        if(!user.authenticate(password))
            return res.status(401).json({
                error : "Email and password not match with the User"
            })
        
        
        const token =  jwt.sign({_id:user._id}, process.env.JWT_SECRET)

        res.cookie('t',token, { expire: new Date() + 9999})
        const { _id, name, email } = user
        
        req.session.profile = user
        console.log(req.session.profile)
        return res.json({ token, user : {_id,email,name}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    req.session.profile = null
    return res.json({ message : 'Signout success!'})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})