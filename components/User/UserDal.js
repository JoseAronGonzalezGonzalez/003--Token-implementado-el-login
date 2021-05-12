/**
 * Data Access Layer
 */
const Database = require("../Database/Database");
const UserDal = {
  query: Database.query,
};
module.exports = UserDal;
