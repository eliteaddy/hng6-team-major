const userData = require('../data/users');
const query = require('../Db/index');

const signIn = async(req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await query('SELECT * from users WHERE email = ($1) OR username = ($1)', [email]);

    if (!rows[0]) {
      return res.status(404).json({ status: 'error',  error: 'Email not found' });
    }

    if (rows[0].password !== password) {
      return res.status(401).json({ status: 'error',  error: 'Incorrect Login details' });
    }

    const response = { ...rows[0] }

    delete response.password;

    return res.status(200).json({ status: 'success', data: response});
  } catch(error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

module.exports = signIn;
