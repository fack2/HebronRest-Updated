const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const postData = require('../queries/postData');
const { getData, getLoginData } = require('../queries/getData');
require('env2')('../../config.env');

const errorHandler = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html',
  });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        'Content-Type': 'text/html',
      });
      response.end('<h1>Server Error</h1>');
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      response.end(file);
    }
  });
};

const publicHandler = (request, response, endpoint) => {
  const extension = endpoint.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    png: 'image/png',
    jpg: 'image/jpg',
  };

  const filePath = path.join(__dirname, '..', '..', endpoint);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        'Content-Type': 'text/html',
      });
      response.end('<h1>Server Error</h1>');
    } else {
      response.writeHead(200, {
        'Content-Type': extensionType[extension],
      });
      response.end(file);
    }
  });
};

const cuisineHandler = (request, response) => {
  const type = request.url.split('=')[1];
  getData(type, (error, result) => {
    if (error) {
      return errorHandler(request, response);
    }
    const dynamicData = JSON.stringify(result);
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(dynamicData);
  });
};

const addRestaurantHandler = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const result = qs.parse(body);
    console.log(
      'cuisine',
      result.cuisine,
      'name',
      result.res_name,
      'location',
      result.location,
      'phone',
      result.phone,
      'delivery',
      result.delivery,
      'phone'
    );
    postData(result, (err, data) => {
      console.log('err', err);
      console.log('data', data);
      console.log('result', result);
    });
    res.writeHead(302, { Location: '/' });
    res.end(JSON.stringify(result));
  });
};

const loginHandler = (request, response) => {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    const { email, password } = qs.parse(body);
    getLoginData(email, (err, passwordInDAtabase) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('Error');
      }
      bcrypt.compare(
        password,
        passwordInDAtabase[0].password,
        (error, compared) => {
          if (error) console.log('err', error);

          const token = sign(email, process.env.secret);
          response.writeHead(302, {
            Location: '/',
            'Set-Cookie': `token=${token}; HttpOnly`,
          });
          response.end();
        }
      );
    });
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  cuisineHandler,
  addRestaurantHandler,
  errorHandler,
  loginHandler,
};
