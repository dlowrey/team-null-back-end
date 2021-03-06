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
    if (err) console.log(err);
    callback(response); // send JSONArray of all daily reports
  });
}

/**
* getAllMonthlyReports: get all monthly reports
*
**/
const getAllMonthlyReports = (req, callback) => {
  let monthly = { type : 2 }; // type = 1 for daily reports
  db.getAllMonthlyReports(monthly, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray of all monthly reports
  });
}


module.exports = {getAllDailyReports, getAllMonthlyReports};
