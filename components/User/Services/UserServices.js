/**
 * los servicios de los usuarios
 */
const signUp = require("./signUp");
const login = require("./login")
const Services = {
  signUp,
  login
};
module.exports = Services;
