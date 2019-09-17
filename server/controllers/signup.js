const userData = require('../data/users');

const signup = (req, res) => {
  const { 
    email, password, userName, firstName, lastName
   } = req.body;

  const userInfo = {};

  const registeredUser = userData.users.filter(user => user.email === email);

  const existingUsername = userData.users.filter(user => user.username === userName);

  if (existingUsername[0]) {
    return res.status(409).json({ status: 'error',  error: 'Username already exists' });
  }

  if (registeredUser[0]) {
    return res.status(409).json({ status: 'error',  error: 'Email already exists' });
  }
  
  userInfo.id = userData.users.length + 1;

  userInfo.email = email;

  userInfo.password = password;

  userInfo.username = userName;

  userInfo.firstName = firstName;

  userInfo.lastName = lastName;

  userData.users.push(userInfo);

  const response = { ...userInfo };

  delete response.password;

  return res.status(201).json({ status: 'success', data: response });
};

module.exports = signup;
