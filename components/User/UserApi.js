/**
 * express para los servicios de usuario
 */
 const express = require("express");
 const cors = require("cors");
 const Services = require("./Services/UserServices");
 const Middleware = require("../Middleware/Middleware");
 
 const User = express.Router();
 
 User.use(express.urlencoded({ extended: true }));
 User.use(express.json());
 User.use(cors());
 
 /**
  * Ruta para un nuevo usuario
  */
 User.post("/sign-up", async (req, res) => {
   let { email, password } = req.body;
   const { status, response } = await Services.signUp(email, password);
   res.status(status).json(response);
 });

 //ruta para un login
 
 User.post("/login", async (req, res) => {
  let { email, password } = req.body;
	const {status, response } = await Services.login(email, password);
	res.status(status).json(response);
 });

//ruta de prueva para saber si funciona lo del token

 User.post("/ruta-secreta", Middleware, (req, res) => {
	res.status(200).json({
		hola: "hi",
		data: req.jwtData
	})
});
 
 module.exports = User;