const http = require('http');
const url = require('url');
const data = require('./data/users');
const validator = require('./validate/validate');

let response;
const userData = {}

module.exports = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, PATCH, DELETE',
    'Access-Control-Max-Age': 2592000
  };

  if (requestUrl.pathname == '/login' && req.method === 'POST') {
      requestBody = '';

    req.on('data', (data) => {
      requestBody += data;
    });

    req.on('end', ()=> {
      const postBody = JSON.parse(requestBody);
      const errors = validator(postBody, res);
      if (errors.length > 0) {
        res.statusCode = 400;
        response = {
          "error": errors
        };
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(400, headers);
        res.end(JSON.stringify(response));
        return;
      }
      else {
        const user = data.users.filter(el => el.email === postBody.email);
        if (!user[0]) {
          userData.email = postBody.email;
          userData.password = postBody.password;
          userData.id = data.users.length + 1;
          data.users.push(userData);
          response = {
            "data": userData
          };
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(201, headers);
          res.end(JSON.stringify(response));
          return;
        }
        else {
          if (user[0].password !== postBody.password) {
            response = {
              "error": 'Invalid login credentials'
            };
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(401, headers);
            res.end(JSON.stringify(response));
            return;
          }
          else {
            response = {
              "data": user[0]
            };
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, headers);
            res.end(JSON.stringify(response));
            return;
          }
        }
      }
    })
  }
  else {
    response = {
      "error": 'The specified route does not exist'
    };
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404, headers);
    res.end(JSON.stringify(response));
    return;
  }
})