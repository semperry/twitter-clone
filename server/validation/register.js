const Validator = require('validator')

module.exports = data => {
  let errors = {}
  
  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field is required'
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid'
  }

  if(Validator.isEmpty(data.login)){
    errors.login = 'Login field is required'
  }

  if (!Validator.isLength(data.login, { min: 4, max: 30 })) {
    errors.login = 'Login name must be between 4 and 30 characters'
  }

  if(Validator.isEmpty(data.password)){
    errors.email = 'Password field is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  if (Validator.isEmpty(data.passwordTwo)) {
    errors.passwordTwo = 'Please confirm your password'
  }
  
  if (!Validator.equals(data.password, data.passwordTwo)) {
    errors.passwordTwo = 'Passwords must match'
  }

  return {
    errors, 
    isValid: Object.keys(errors).length === 0
  }

  
}