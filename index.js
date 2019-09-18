const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const busboy = require('connect-busboy')
const session = require('express-session')
const cors = require('cors')
const fs = require('fs')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(morgan('short'))
app.use(expressValidator())
app.use(busboy())

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,

}))

mongoose
    .connect(process.env.DEV_URL_MONGO,{useNewUrlParser:true},(err, client) => {
        if (err) return  console.error(err)

  },)
app.get('/docs',(req,res) => {

    fs.readFile('docs/apiDocs.json', (err,data) => {

      return res.send(data)
    })
})
app.use(cors())
app.use(require('./src/routes/post'))
app.use(require('./src/routes/auth'))
app.use(require('./src/routes/user'))
app.use( (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') 
    res.status(401).json({ error : 'UnauthorizedError'});
});


app.listen(process.env.PORT,()=> console.log('server on'))