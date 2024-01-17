const Router = require('express');
const path = require('path');
// const { authMiddleware, orderSortMiddleware } = require('../middlewares/index');
// const ProductController = require('../controllers/productController');
const pagesRouter = new Router();
const authMiddleware = require('../middlewares/auth');
const { getAnimalsList, getOrders } = require('../controllers/orders');

pagesRouter.get('/', function (req, res) {
  res.render(path.join(__dirname, '..', '..', 'client', 'views', 'index'));
});

pagesRouter.get('/login', function (req, res) {
  res.render(path.join(__dirname, '..', '..', 'client', 'views', 'login'), {
    errors: [],
    email: '',
  });
});

pagesRouter.get('/register', function (req, res) {
  res.render(path.join(__dirname, '..', '..', 'client', 'views', 'register'), {
    errors: [],
    values: {},
  });
});

pagesRouter.get('/profile/orders', [authMiddleware], getOrders, function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(301).redirect('/login');
  }
  res.render(path.join(__dirname, '..', '..', 'client', 'views', 'orders'), {
    userRole: res.locals.userRole,
    orders: res.locals.orders,
  });
});

pagesRouter.get('/order', [authMiddleware], getAnimalsList, function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(301).redirect('/login');
  }
  res.render(path.join(__dirname, '..', '..', 'client', 'views', 'order'), {
    inputsValue: {},
    values: [res.locals.values, 0],
    errors: [],
  });
});

module.exports = pagesRouter;
