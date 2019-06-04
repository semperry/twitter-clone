require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const PORT = 5000 || process.env.PORT
const app = express()

//connect db 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
.then(() => console.log('Connected to the db'))
.catch(err => {
  console.log('Connection error: ', err);
  
})


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/users', users)

app.listen(PORT, () => console.log(`Server is runnging on port ${PORT}`))

