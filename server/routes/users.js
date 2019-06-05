const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../validation/register')

router.route('/register').post((req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body)

  if(!isValid) {
    return res.status(500).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Account already exists with this email'
        return res.status(500).json(errors)
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const newUser = new User({
            email: req.body.email, 
            login: req.body.login,
            password: hash
          })

          newUser.save()
            .then(newUser => res.json(newUser))
            .catch(err => console.log("Registration error: " + err))
        })
      })
    })
})

module.exports = router