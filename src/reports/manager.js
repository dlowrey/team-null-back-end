const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
* getAllDailyReports: get all daily reports
*
**/
const getAllDailyReports = (req, callback) => {
  let daily = { type : 1 }; // type = 1 for daily reports
  db.getAllDailyReports(daily, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send JSONArray of all uncompleted apps for [month]
  });
}


module.exports = {getAllDailyReports};
