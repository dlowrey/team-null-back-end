const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
* getAllDoctors: get a list of all doctors
*
**/
const getAllDoctors = (req, callback) => {
  let type = { type : 1 }; // Employee type 1 is doctors
  db.getAllDoctors(type, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send JSONArray of all doctors
  });
}

module.exports = {getAllDoctors};