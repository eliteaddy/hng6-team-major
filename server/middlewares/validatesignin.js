const signIn = (req, res, next) => {
  const regexForEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  const errors = [];

  const { email, password, userName } = req.body;

  if (!email && !userName) errors.push('Input either a username or your email to continue');

  if (!password) errors.push('Input a password to continue');

  if (password && !/^(?=.*[a-z])/.test(password)) errors.push('Password must contain at least one lower case character');

  if (password && !/^(?=.*[A-Z])/.test(password)) errors.push('Password must contain at least one upper case character');

  if (password && !/^(?=.*[0-9])/.test(password)) errors.push('Password must contain at least one number');

  if (password && !/^(?=.*[!@#$%^&*])/.test(password)) errors.push('Password must contain at least one special case character');

  if (password && !/^(?=.{8,})/.test(password)) errors.push('Password must contain at least 8 characters');

  if (password && /\s/.test(password)) errors.push('Password must not contain whitesepace');

  if (email && !regexForEmail.test(email)) errors.push('Invalid email supplied');

  if (userName && !/^[a-zA-Z0-9]+$/.test(userName)) errors.push('Username can only contain a combination of numbers and alphabets')

  if (errors.length > 0) {
    return res.status(401).json({
      status: 'error',
      error: errors
    })
  }

  return next();
};

module.exports = signIn;
