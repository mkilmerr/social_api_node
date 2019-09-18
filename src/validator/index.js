exports.createPostValidator = (req,res,next) => {
    // title 
    req.check('title','Write a title').notEmpty()
    req.check('title','Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    })

    // body 
    req.check('body','Write a body').notEmpty()
    req.check('body','Body must be between 4 to 150 characters').isLength({
        min: 4,
        max: 2000
    })
    //req.check('photo','Photo is required').notEmpty()
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map( (err) => err.msg)[0]
        return res.status(400).json({error : firstError})
    }
    next()
}

exports.userSignupValidator =  (req, res, next) => {
    req.check('name','Name is required').notEmpty()
    req.check('email','Email must be between 3 to 32 characters')
        .matches(/.+@.+\..+/)
        .withMessage('Email must contain @')
        .isLength( {
            max: 2000 ,
            min: 4,
        } )
    req.check('password','Password is required').notEmpty()
    req.check('password')
        .isLength( { min: 6} )
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        const errors = req.validationErrors()
        if (errors) {
            const firstError = errors.map( (err) => err.msg)[0]
            return res.status(400).json({error : firstError})
        }
        next()
}