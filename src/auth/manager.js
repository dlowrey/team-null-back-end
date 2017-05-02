const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* login: Checks if there is a user with the specified id and password
*
**/
const login = (req, callback) => {
  let body     = req.body; // get post body
  let id       = {id : body.id};
  let password = {password : body.password};
  db.login([id,password], (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send response info from query back
  });
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {login};