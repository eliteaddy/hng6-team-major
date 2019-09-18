const userData = require('../data/users');
const query = require('../Db/index');

const signIn = async(req, res) => {
  const { email, password } = req.body;

  const errors = [];

  try {
    const { rows } = await query('SELECT * from users WHERE email = ($1) OR username = ($1)', [email]);

    if (!rows[0]) {
      errors.push('Email or Username not found');
      return res.status(404).json({ status: 'error',  error: errors });
    }

    if (rows[0].password !== password) {
      errors.push('Email or Username not found');
      return res.status(401).json({ status: 'error',  error: errors });
    }

    const response = { ...rows[0] }

    delete response.password;

    return res.status(200).json({ status: 'success', data: response});
  } catch(error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

module.exports = signIn;
