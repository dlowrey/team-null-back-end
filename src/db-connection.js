const mysql = require('mysql');

const dbConfig = {
  host      :'localhost',
  user      :'root',
  password  :'password',
  database  :'healthcaredb',
  multipleStatements : true,
  connectionLimit : 10
};

const pool = mysql.createPool(dbConfig);

// Function to handle any and all database queries
const executeSQL = (sql, params, callback) => {
  pool.getConnection((err, cnx) => {
    if(err) {
      console.log(err);
    } else {
      let query = cnx.query(sql, params, callback);
      cnx.release();
      console.log('Ran query: ', query.sql);
    }
  });
}

// Export connection
module.exports = {executeSQL};
