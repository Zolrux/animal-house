const { Animals, Order, User } = require('../database/models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

async function createOrder(req, res, next) {
  const isAuth = res.locals.isAuth;

  if (!isAuth) {
    return res.status(301).redirect('/');
  }

  const errors = validationResult(req);
  const { name, phone, email, animal, nickname, comment, arrivalDate, departureDate } = req.body;

  if (!errors.isEmpty() || !animal) {
    const animals = await Animals.findAll();
    const values = animals.map((obj) => ({ id: obj.dataValues.id, type: obj.dataValues.type }));
    const errorsArr = errors.array().map((obj) => obj.msg);

    if (!+animal) {
      errorsArr.push('Select animal type');
    }

    return res.render('../../client/views/order', {
      inputsValue: { name, phone, email, nickname, comment, arrivalDate, departureDate },
      values: [values, +animal || 0],
      errors: errorsArr,
    });
  }

  const token = req.cookies['token'];
  const { id } = jwt.decode(token);

  const formattedDate = (date) => {
    const parts = date.split('/');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  };

  const formattedPhone = (phoneNumber) => phoneNumber.replaceAll('-', '');

  await Order.create({
    name,
    phone: formattedPhone(phone),
    email,
    nickname,
    comment,
    arrivalDate: formattedDate(arrivalDate),
    departureDate: formattedDate(departureDate),
    user_id: id,
    animal_id: +animal,
  });

  return res.status(200).redirect('/profile/orders');
}

async function getAnimalsList(req, res, next) {
  if (!res.locals.isAuth) {
	console.log('dgdggd');
    return res.status(301).redirect('/login');
  }

  const animals = await Animals.findAll();
  const values = animals.map((obj) => ({ id: obj.dataValues.id, type: obj.dataValues.type }));

  res.locals.values = values;

  next();
}

async function getOrders(req, res, next) {
  const isAuth = res.locals.isAuth;

  if (!isAuth) {
    return res.status(301).redirect('/login');
  }

  const token = req.cookies['token'];
  const { email, role } = jwt.decode(token);
  let orders = null;

  const user = await User.findOne({ where: { email } });

  res.locals.userRole = role;

  if (user.dataValues.role === 'user') {
    orders = await Order.findAll({
      where: {
        user_id: user.dataValues.id,
      },
      include: [
        {
          model: User,
          attributes: ['surname'],
        },
		  {
			model: Animals,
			attributes: ['type']
		  }
      ],
    });
  }

  if (user.dataValues.role === 'admin') {
	orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['surname'],
        },
		  {
			model: Animals,
			attributes: ['type']
		  }
      ],
    });
  }

  res.locals.orders = orders.map((order) => {
    const { id, name, phone, status, arrivalDate, departureDate } = order.dataValues;

    const formattedDate = (value) => {
      const addZero = (value) => (value < 10 ? `0${value}` : value);
      const date = new Date(value);
      const day = addZero(date.getDate());
      const month = addZero(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    return {
		id,
      name,
      surname: order.dataValues.User.dataValues.surname,
      phone,
      status,
		animal: order.dataValues.Animal.dataValues.type,
      arrivalDate: formattedDate(arrivalDate),
      departureDate: formattedDate(departureDate),
    };
  });

  next();
}

async function updateOrder(req, res, next) {
	if (!res.locals.isAdmin) {
		return res.status(403).json({message: 'You are not admin'});
	}

	const {id, status} = req.body;
	await Order.update({status}, {where: {id}});
	return res.status(200).json({message: 'Order was updated successfully'});
}

module.exports = { createOrder, getAnimalsList, getOrders, updateOrder };
