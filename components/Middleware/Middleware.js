const { verifyJwt } = require("../../libs/utils");


//funcion que valide si esta autenticado el usuario o no
const Middleware = (req, res, next) => {
	try {
		const jwtData = verifyJwt(req.headers.authorization);
		req.jwtData = jwtData;
		next();
	} catch(error) {
		//console.log(error);
		res.status(401).json({
			message: "No se encuentra autenticado."
		});
	}
};

module.exports = Middleware;