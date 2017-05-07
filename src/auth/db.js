const db = require('../db-connection.js'); // Get connection to MySQL

/**
* login: Checks if there is a user with the specified id and password
* args params: a JSON with {id,password}
**/
const login = (params, callback) => {
  const sql = 'SELECT id, last_name, first_name, type, ' +
  'associated_id FROM employees WHERE ? AND ?';
  db.executeSQL(sql, params, callback);
};

// Export all functions so that manager.js can find/use them in functions.
module.exports = login;
