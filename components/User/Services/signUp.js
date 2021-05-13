const Dal = require("../UserDal");
const { hashPassword, generateJwt } = require("../../../libs/utils");

/**
 * crea un nuevo usuario
 * @param {string} nombre
 * @param {string} apellidos
 * @param {string} email
 * @param {string} password
 * @param {int} edad
 * @returns {object} {status: int, response: object}
 */
const signUp = async (nombre,apellidos,email, password,edad) => {
  let response = {};
  let status = 500;
  let duplicateUsers = null;

  //exprecion que permite validar correctamente un email.dominio
  var exp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var esValido;

  // buscar por usuarios duplicados
  try {
    esValido = exp.test(email);
    if(esValido==true && Object.keys(password).length!=0){
      duplicateUsers = await Dal.query("SELECT email FROM users WHERE email=?", [
        email,
      ]);
      response ={
        message: "correo valido"
      };
    }else{
      response = {
        message: "correo no valido"
      };
    }
    
  } catch (error) {
    response = {
      message: "Ha ocurrido un error al registrar al usuario",
      data: null,
    };
		status = 500;
		return {
			status, 
			response
		};
  }

  // Insertar usuario si no es existente
  if (duplicateUsers?.length === 0) {
    try {
      const result = await Dal.query(
        "INSERT INTO users (nombre,apellidos,email, password,edad) VALUES (?, ?, ?, ?, ?)",
        [nombre,apellidos,email, hashPassword(password),edad]
      );
      response = {
        message: "Registro de usuario realizado correctamente.",
        data: {
          id: result.insertId,
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          token: generateJwt({
            id: result.insertId,
            email: email,
          }),
        },
      };
      status = 200;
    } catch (error) {
      response = {
        message: error.message,
        data: null,
      };
      status = 500;
    }
  } else {
    response = {
      message: `El email ${email} ya está en uso o el correo esta insertado incorrectamento debe contener @ y .com o cualquier dominio
      ,verifique que tenga los campos llenos`,
      data: null,
    };
    status = 400;
  }

  return {
    status,
    response,
  };
};

module.exports = signUp;