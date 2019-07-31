const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const qs = require('querystring');
const bcrypt = require('bcrypt');
const { sign, verify} = require('jsonwebtoken');
const {postData, postUserData} = require('../queries/postData');
const { getData, getLoginData } = require('../queries/getData');
const cookie = require('cookie');


const homeHandler = (page, request, response) => {
	let filePath = path.join(__dirname, '..', '..', 'public', `${page}.html`);
	if (page === 'profile') {
		const comingToken = cookie.parse(request.headers.cookie).token;
		 jwt.verify(comingToken, '123456',(err,jwt)=>{

			if (cookie.parse(request.headers.cookie).loggedIn === 'true' && jwt) {
				filePath = path.join(__dirname, '..', '..', 'public', `${page}.html`);
			} else {
				filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
				
			}
		});
	}
	fs.readFile(filePath, (error, file) => {
		if (error) {
			console.log(error);
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			response.end('<h1>Server Error</h1>');
		} else {
			response.writeHead(200, {
				'Content-Type': 'text/html'
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
		jpg: 'image/jpg'
	};

	const filePath = path.join(__dirname, '..', '..', endpoint);

	fs.readFile(filePath, (error, file) => {
		if (error) {
			console.log(error);
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			response.end('<h1>Server Error</h1>');
		} else {
			response.writeHead(200, {
				'Content-Type': extensionType[extension]
			});
			response.end(file);
		}
	});
};

const cuisineHandler = (request, response) => {
	const type = request.url.split('=')[1];
	console.log('type', type);
	getData(type, (error, result) => {
		if (error) {
			return errorHandler(request, response);
		}
		console.log('result', result);

		let dynamicData = JSON.stringify(result);
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(dynamicData);
	});
};

const addRestaurantHandler = (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk.toString();
		console.log('chunk', body);
	});
	req.on('end', () => {
		const result = qs.parse(body);
		postData(result, (err, data) => {});
		res.writeHead(302, { Location: '/' });
		res.end();
	});
};

const errorHandler = (request, response) => {
	response.writeHead(404, {
		'content-type': 'text/html'
	});
	response.end('<h1>404 Page Requested Cannot be Found</h1>');
};


const signUpHandler = (request , response)=>{
let body = ''; 
request.on('data', chunk =>{
	body+= chunk.toString();
})

request.on('end', ()=>{
	const result = qs.parse(body);
	console.log(body);
	console.log("result",result.email)

	bcrypt.hash(result.password, 10, (hashErr, hashedPassword) => {
		if (hashErr) {
		  res.statusCode = 500;
		  res.end('Error registering')
		  return
		}
	

postUserData(result.email,hashedPassword,  (err, data) =>{
	if (err) {
		console.log(err);
        response.writeHead(500, {
          "Content-Type": "text/html"
        });
        response.end("<h1>Server Error</h1>");
      }
      response.writeHead(302, { 'Location': '/' });
      response.end()
} )
})

});
}
module.exports = {
  homeHandler,
  publicHandler,
  cuisineHandler,
  addRestaurantHandler,
  errorHandler,
  signUpHandler
};