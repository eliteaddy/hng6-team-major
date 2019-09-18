const userData = require('../data/users');
const query = require('../Db/index');

const signup = async(req, res) => {
  const errors = [];
  const { 
    email, password, userName, firstName, lastName
   } = req.body;

  try {
    const registeredUser = await query('SELECT * FROM users WHERE email = $1', [email]);

    const existingUsername = await query('SELECT * FROM users WHERE username = $1', [userName]);

    if (existingUsername.rows[0]) {
      errors.push('Username already exists')
    }

    if (registeredUser.rows[0]) {
      errors.push('Email already exists')
    }

    const insertQuery = 'INSERT INTO users (email, password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    
    const { rows } = await query(insertQuery, [email, password, userName, firstName, lastName]);

    const response = { ...rows[0] };

    delete response.password;

    if (errors.length > 0) {
      return res.status(409).json({ status: 'success', error: errors });
    }

    return res.status(201).json({ status: 'success', data: response });
  } catch(error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

module.exports = signup;
