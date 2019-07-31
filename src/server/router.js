const {
  homeHandler,
  publicHandler,
  cuisineHandler,
  addRestaurantHandler,
  errorHandler,
  loginHandler,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    homeHandler(request, response);
  } else if (endpoint.indexOf('public') !== -1) {
    publicHandler(request, response, endpoint);
  } else if (endpoint.indexOf('/cuisine') !== -1) {
    cuisineHandler(request, response);
  } else if (endpoint.indexOf('/create-rest') !== -1) {
    addRestaurantHandler(request, response);
  } else if (endpoint.includes('/login')) {
    loginHandler(request, response);
  } else {
    errorHandler(request, response);
  }
};

module.exports = router;
