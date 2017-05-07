const connection = require('../db-connection.js'); // Get connection to MySQL

/**
* login: Checks if there is a user with the specified id and password
* args params: a JSON with {id,password}
**/
const login = (params, callback) => {
  let query = connection.query('SELECT id, last_name, first_name, type, ' +
                               'associated_id FROM employees WHERE ? AND ?',
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

// Export all functions so that manager.js can find/use them in functions.
module.exports = {login};
