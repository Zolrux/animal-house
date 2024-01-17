const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
  const token = req.cookies['token'];

  if (!token) {
    res.locals.isAuth = false;
    next();
    return;
  }

  try {

	const isValidToken = jwt.verify(token, process.env.JWT_KEY);

	if (!isValidToken) {
	  res.locals.isAuth = false;
	  next();
	  return;
	}
 
	res.locals.isAuth = true;
	next();
	
  } catch (_) {
	res.locals.isAuth = false;
	next();
	return;
  }
}

module.exports = authMiddleware;