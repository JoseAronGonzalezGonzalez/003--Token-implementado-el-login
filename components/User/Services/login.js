const Dal = require("../UserDal");
const { verifyPassword, generateJwt } = require("../../../libs/utils");

const login = async (email, password) => {
	let response = {};
	let status = 500;
	let users;
	try {
		users = await Dal.query("SELECT * FROM users WHERE email=?", [email]);
	} catch(error){
		response = {
			message: "Ha ocurrido un error al iniciar sesión",
			data: null
		};
		status = 500;
		return {
			status,
			response
		};
	}
	if (users?.length) {
		// Comprobacion de la contraseña
		const user = users[0];
		if(verifyPassword(password, user.password)){
			response = {
				message: "Usuario autenticado correcto",
				data: {
          			id: user.id,
          			email: user.email,
         			token: generateJwt({
           				id: user.id,
            			email: user.email,
          			}),
        		},
			};
			status = 200;
		} else {
			response = {
      			message: "Usuario o contraseña incorrecta.",
      			data: null,
    		};
    		status = 400;
		}
    	//console.log(users, "users");
	} else {
		response = {
			message: "Usuario o contraseña incorrecta.",
			data: null
		};
		status = 400;
	}
	return {
		status,
		response
	}
};

module.exports = login;