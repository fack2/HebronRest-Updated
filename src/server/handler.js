const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const qs = require('querystring');
const bcrypt = require('bcrypt');
const { sign, verify} = require('jsonwebtoken');
const {postData, postUserData} = require('../queries/postData');
const { getData, getLoginData } = require('../queries/getData');
const cookie = require('cookie');
const alert = require('alert-node')


const homeHandler = (page, request, response) => {
	let filePath = path.join(__dirname, '..', '..', 'public', `${page}.html`);
	if (page === 'profile') {
		const comingToken = cookie.parse(request.headers.cookie).token;
		 verify(comingToken, process.env.secret,(err,result)=>{

			if (result) {
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
	getData(type, (error, result) => {
		if (error) {
			return errorHandler(request, response);
		}

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

	bcrypt.hash(result.signUppassword, 10, (hashErr, hashedPassword) => {
		if (hashErr) {
		  response.statusCode = 500;
		  response.end('Error registering')
		}
	

postUserData(result.signUpemail,hashedPassword,  (err, data) =>{
	if (err) {
        response.writeHead(302, {
		Location : '/'		  
		});
		alert("email exists")

        response.end();
      }
      response.writeHead(302, { 'Location': '/' });
      response.end()
} )
})

});
}

const logOutHandler = (request, response) =>{
	response.writeHead(302, {Location: '/','Set-Cookie': `token=0`});
response.end()
}



const loginHandler = (request, response) => {
	let body = '';
	request.on('data', chunk => {
		body += chunk.toString();
	});


	request.on('end', () => {
		const { email, password } = qs.parse(body);



		getLoginData(email, (err,hashedPassword) => {
			if(err){
				alert("email doesn't exist")
				response.writeHead(302, { Location: '/' });
				response.end("<h1> error</h1>");
				}else{

		

			const newpass = hashedPassword.password;
			bcrypt.compare(password, newpass,(error, compared) => {

					if(compared){
						const token = sign(email, process.env.secret);
						response.writeHead(302, {Location: '/profile','Set-Cookie': `token=${token}`});
						response.end();
					} else if (!compared){
						alert('password incorrect')
						response.writeHead(302, { Location: '/' });
						response.end();
					}else if(error){						
						response.writeHead(500, { 'Content-Type': 'text/html' });
						response.end('login Error');

					}
				}
			);
		}


		});


	});
}


module.exports = {
  homeHandler,
  publicHandler,
  cuisineHandler,
  addRestaurantHandler,
  errorHandler,
  signUpHandler,
  loginHandler,
  logOutHandler
};