require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const PORT = 5000 || process.env.PORT
const passport = require('passport')

const app = express()

// Connect DB 
mongoose.Promise = global.Promise;

// Create index to remove ensure index deprecation warning
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
.then(() => console.log('Connected to the db'))
.catch(err => {
  console.log('Connection error: ', err);
  
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)

app.listen(PORT, () => console.log(`Server is alive and well on port ${PORT}`))

