const router = require('express').Router()
const User = require('../models/User')

router.route('/register').get((req, res) => {
  res.send('Hello')
})

module.exports = router