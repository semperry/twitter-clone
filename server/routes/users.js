const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')



router.route('/users')
	.get((req, res) => {
		return res.status(200).json(res)
	})

router.route('/register')
	.post((req, res) => {
		const { isValid, errors } = validateRegisterInput(req.body)

		if (!isValid) {
			return res.status(404).json(errors)
		}

		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					errors.email = 'Email was used!'
					return res.status(404).json(errors)
				}

				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(req.body.password, salt, function (err, hash) {
						const newUser = new User({
							email: req.body.email,
							login: req.body.login,
							password: hash
						})

						newUser.save()
							.then(newUser => res.json(newUser))
							.catch(err => console.log(err))
					})
				})
			})
})

router.route('/login')
	.post((req, res) => {
		const { errors, isValid } = validateLoginInput(req.body)

		if (!isValid) {
			return res.status(404).json(errors)
		}

		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					bcrypt.compare(req.body.password, user.password)
					.then(isMatch => {
						if (isMatch) {
							const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function (err, token) {
								return res.json({
									success: true,
									token: token
								})
							})
						} else {
							errors.password = 'Password is incorrect'
							return res.status(404).json(errors)
						}
					})
				} else {
					errors.email = 'User not found'
					return res.status(404).json(errors)
				}
			})
})

module.exports = router 