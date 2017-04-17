var mysql = require('mysql');

// Establish connection
var connection = mysql.createConnection({
    host      :'localhost',
    user      :'root',
    password  :'password',
    database  :'healthcaredb'
  });

// Export connection
module.exports = connection;
