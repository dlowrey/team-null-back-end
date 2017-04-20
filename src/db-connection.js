const mysql = require('mysql');

// Establish connection
const connection = mysql.createConnection({
    host      :'localhost',
    user      :'root',
    password  :'password',
    database  :'healthcaredb'
  });

// Export connection
module.exports = connection;
