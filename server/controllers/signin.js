const userData = require('../data/users');

const signIn = (req, res) => {
  const { 
    email, password, userName
   } = req.body;

  const existingUser = userData.users.filter(user => user.email === email || user.username === userName);

  if (!existingUser[0]) {
    return res.status(404).json({ status: 'error',  error: 'Email not found' });
  }

  if (existingUser[0].password !== password) {
    return res.status(401).json({ status: 'error',  error: 'Incorrect Login details' });
  }

  const response = { ...existingUser[0] }

  delete response.password;

  return res.status(200).json({ status: 'success', data: response});
};

module.exports = signIn;
