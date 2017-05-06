const mysql = require('mysql');
const credentials = require('credentials');
const dbConfig = {
  host      :'localhost',
  user      :credentials.dbUser,
  password  : credentials.dbPass,
  database  :'healthcaredb',
  multipleStatements : true,
  connectionLimit : 10
};

const pool = mysql.createPool(dbConfig); // create a pool of 10 connections

/**
* executeSQL: execute sql against the databse in dbConfig
* get a connection from the connection pool
* execute the statement in the variable sql and send the
* response back to the calling function through callback
* release the connection back to the pool
**/
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
