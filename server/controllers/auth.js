const {User, Order, Animals } = require('../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res, next) {
	const errors = validationResult(req);
	const values = {...req.body};

	if (!errors.isEmpty()) {
		return res.render('../../client/views/register', {
			values,
			errors: errors.array().map(obj => obj.msg)
		});
	}

	const {name, surname, phone, email, password } = req.body;

	const candidate = await User.findOne({where: {email}});

	if (candidate) {
		return res.render('../../client/views/register', {
			values,
			errors: ['User is already registered with this email']
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const formattedPhone = phone.replaceAll('-', '');

	const user = await User.create({
		name, 
		surname, 
		phone: formattedPhone, 
		email,
		password: hashedPassword});

	const generatedToken = jwt.sign({
		id: user.id,
		email: user.email,
		role: user.role
	}, process.env.JWT_KEY, {expiresIn: '1d'});

	res.cookie('token', generatedToken, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24
	});

	return res.status(200).redirect('/');

}

async function login(req, res, next) {
	const errors = validationResult(req);
	const {email: valueEmail, password} = req.body;

	if (!errors.isEmpty()) {
		return res.render('../../client/views/login', {
			email: valueEmail,
			errors: errors.array().map(obj => obj.msg)
		});
	}

	const dbErrors = [];

	const candidate = await User.findOne({where: {email: valueEmail}});

	if (!candidate) {
		dbErrors.push('User is not found');
		return res.render('../../client/views/login', {
			email: valueEmail,
			errors: dbErrors
		});
	}

	const isValidPassword = await bcrypt.compare(password, candidate.password);

	if (!isValidPassword) {
		dbErrors.push('Wrong password');
		return res.render('../../client/views/login', {
			email: valueEmail,
			errors: dbErrors
		});
	}

	const generatedToken = jwt.sign({
		id: candidate.id,
		email: candidate.email,
		role: candidate.role
	}, process.env.JWT_KEY, {expiresIn: '1d'});

	res.cookie('token', generatedToken, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24
	});

	return res.status(200).redirect('/');

}

module.exports = {register, login};