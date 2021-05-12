/**
 *  encargado de iniciar el servidor ,tambien importar los componentes.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// componentes
const User = require("./components/User/User");

// configuracion de express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Desarrollo || si es un API Publica

// componentes registros
app.use("/usuarios", User.api);

// inicia nuestro servidor
app.listen(3000, () => {
  console.log("corriendo en puerto 3000");
});
