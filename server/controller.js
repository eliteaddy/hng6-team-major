const http = require('http');
const url = require('url');
const Db = require('./db');
const validator = require('./validate/validate');

let response;

module.exports = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);

  if (requestUrl.pathname == '/login' && req.method === 'POST') {

      requestBody = '';

      req.on('data', (data) => {
        requestBody += data;
      });

      req.on('end', async()=> {
        try {
          const postBody = JSON.parse(requestBody);
          const errors = validator(postBody, res);
          if (errors.length > 0) {
            res.statusCode = 400;
            response = {
              "error": errors
            };
          }
          else {
            const { rows } = await Db('SELECT * FROM users WHERE email = $1', [postBody.email]);
            if (!rows[0]) {
              const newUser = await Db('INSERT INTO users (email, password) VALUES ($1, $2) returning *', [postBody.email, postBody.password]);
              response = {
                "data": newUser.rows[0]
              };
              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(response));
            }
            else {
              if (rows[0].password !== postBody.password) {
                response = {
                  "error": 'Invalid login credentials'
                };
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
              }
              else {
                response = {
                  "data": rows[0]
                };
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
              }
            }
          }
        } catch (error) {
          res.statusCode = 500;
          response = {
            "error": error.message
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response));
        }
      })
  }
  else {
    response = {
      "error": 'The specified route does not exist'
    };
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }
})