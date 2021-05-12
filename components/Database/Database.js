/**
 * ejecutar y consultar sentencias a la base de datos
 * muysql2 y promise para poder hacer await a las querys
 */
const mysql = require("mysql2/promise");
const databaseConfig = require("./databaseConfig");

async function query(sql, params) {
  const connection = await mysql.createConnection(databaseConfig.connection);
  const [result] = await connection.execute(sql, params);
  return result;
}

const Database = {
  query,
};

module.exports = Database;
