/**
 * configuracion base de datos para mysql2
 */
const databaseConfig = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

module.exports = databaseConfig;
