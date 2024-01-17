const Router = require('express');
// const ProductController = require('../controllers/productController');
const authRouter = new Router();
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

authRouter.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('Last name is required'),
    body('phone')
      .matches(/^\+380-\d{2}-\d{2}-\d{2}-\d{3}$/)
      .withMessage('Enter the correct phone number in the format +380-XX-XX-XX-XXX'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters'),
  ],
  register
);

authRouter.post('/login', [body('email').isEmail().withMessage('Enter a valid email address')], login);

authRouter.get('/logout', [authMiddleware], function(req, res, next) {
	if (res.locals.isAuth) {
		return res.clearCookie('token').status(200).redirect('/');
	}
	return res.status(301).redirect('/');
})

module.exports = authRouter;
