const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const createApp = (req, callback) => {
  let body = req.body;
  let params = { // get parameters for the query
    employee_id  : body.employee_id,
    patient_id   : body.patient_id,
    date_time    : new Date(body.date_time),
    completed    : false
  };
  db.createApp(params, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send db response back to router
  });
}



const modifyApp = (req, callback) => {
  let body = req.body;
  let uid = { id : req.params.uid }; //I'm not sure if I'm pulling uid from the correct place.
  let params = {
    employee_id  : body.employee_id,
    patient_id   : body.patient_id,
    date_time    : new Date(body.date_time),
    completed    : body.completed
  };
  db.modifyApp([params, uid], (err, response, fields) => { //I assumed I had to pass uid separately from params.
    if (err) throw err;
    callback(params);
  });
}

module.exports = {createApp, modifyApp};
