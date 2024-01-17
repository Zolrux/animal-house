const jwt = require('jsonwebtoken');

function checkRole(role) {
	return function(req, res, next) {
		if (!res.locals.isAuth) {
			next();
			return;
		}

		const token = req.cookies['token'];
		const {role: tokenRole} = jwt.decode(token);

		res.locals.isAdmin = false;
	
		if (tokenRole === role) {
			res.locals.isAdmin = true;
		}

		next();
	}
}

module.exports = checkRole;