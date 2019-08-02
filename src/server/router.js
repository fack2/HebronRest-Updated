const {
  homeHandler,
  publicHandler,
  cuisineHandler,
  addRestaurantHandler,
  errorHandler,
  loginHandler,
  signUpHandler,
  logOutHandler,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    homeHandler('index', request, response);
  } else if (endpoint.indexOf('public') !== -1) {
    publicHandler(request, response, endpoint);
  } else if (endpoint.indexOf('/cuisine') !== -1) {
    cuisineHandler(request, response);
  } else if (endpoint.indexOf('/create-rest') !== -1) {
    addRestaurantHandler(request, response);
  } else if (endpoint === '/profile') {
    homeHandler('profile', request, response);
  } else if (endpoint.indexOf('/signUp') !== -1) {
    signUpHandler(request, response);
  } else if (endpoint.indexOf('/login') !== -1) {
    loginHandler(request, response);
  } else if (endpoint.indexOf('/logout') !== -1) {
    logOutHandler(request, response);
  } else {
    errorHandler(request, response);
  }
};

module.exports = router;
