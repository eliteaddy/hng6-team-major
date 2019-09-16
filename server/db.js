const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const query = async(queryString, params) => {
  try {
    const data = await pool.query(queryString, params);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = query;