const db = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser'); // To parse HTML post body

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* login: Checks if there is a user with the specified id and password
*
**/
const login = (req, callback) => {
  const body = req.body; // HTTP POST body
  const id = { id: body.id };
  const password = { password: body.password };
  const params = [id, password]; // Login Attributes (preserver order)
  db.login(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

// Export all functions so that router.js can find/use them in endpoints.
module.exports = login;
