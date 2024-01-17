const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const sequelize = require('./database/connect');
const {User, Order, Animals} = require('./database/models');
const pagesRouter = require('./routes/pagesRouter');
const authRouter = require('./routes/authRouter');
const ordersRouter = require('./routes/ordersRouter');
// import {routerPages, authRouter, orderRouter} from './routes/index.js';
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "../client/images/dist")));
app.use(express.static(path.join(__dirname, "../client/css")));
app.use(express.static(path.join(__dirname, "../client/js")));

app.use('/', [pagesRouter, authRouter, ordersRouter]);

async function init() {
	const PORT = process.env.PORT || 3000;
  
	try {
	  await sequelize.authenticate();
	  await sequelize.sync();
	  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
	} catch (e) {
	  console.log(e);
	}
}

init();