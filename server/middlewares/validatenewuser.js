const validator = (req, res, next) => {
  const regexForEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  const errors = [];

  const { 
    email, password, userName, confirmPassword, firstName, lastName 
  } = req.body;

  if (!email) errors.push('Input an email to continue');

  if (!password) errors.push('Input a password to continue');

  if (!userName) errors.push('Input a username to continue');

  if (!confirmPassword) errors.push('Confirm Password is required');

  if (!firstName) errors.push('Input a firstname to continue');

  if (!lastName) errors.push('Input a last name to continue');

  if (password && !/^(?=.*[a-z])/.test(password)) errors.push('Password must contain at least one lower case character');

  if (password && !/^(?=.*[A-Z])/.test(password)) errors.push('Password must contain at least one upper case character');

  if (password && !/^(?=.*[0-9])/.test(password)) errors.push('Password must contain at least one number');

  if (password && !/^(?=.*[!@#$%^&*])/.test(password)) errors.push('Password must contain at least one special case character');

  if (password && !/^(?=.{8,})/.test(password)) errors.push('Password must contain at least 8 characters');

  if (password && /\s/.test(password)) errors.push('Password must not contain whitesepace');

  if ((password && confirmPassword) && (password !== confirmPassword)) errors.push('Password and Confirm password do not match');

  if (email && !regexForEmail.test(email)) errors.push('Invalid email supplied');

  if (userName && !/^[a-zA-Z0-9]+$/.test(userName)) errors.push('Username can only contain a combination of numbers and alphabets');

  if ((lastName && !/^[a-zA-Z\-]+$/.test(lastName.trim())) || (lastName && lastName.trim().length < 3)) errors.push('Invalid last name supplied');

  if ((firstName && !/^[a-zA-Z\-]+$/.test(firstName.trim())) || (firstName && firstName.trim().length < 3)) errors.push('Invalid first name supplied');
  
  if (errors.length > 0) {
    return res.status(401).json({
      status: 'error',
      error: errors
    })
  }

  return next();
}

module.exports = validator;
