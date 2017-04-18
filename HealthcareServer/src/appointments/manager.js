const db = require('./db.js');

const createApp = (reqData, callBack) => {
  let params = { // get parameters for the query
    employee_id  : reqData.employee_id,
    patient_id   : reqData.patient_id,
    date_time    : new Date(reqData.date_time),
    completed    : false
  };
  db.createApp(params, (err, response, fields) => {
    if (err) throw err;
    callBack(response); // send db response back to router 
  });
}



const modifyApp = (reqData, callBack) => {
  let uid = { appointment_id : reqData.params.uid }; //I'm not sure if I'm pulling uid from the correct place.
  let params = {
    employee_id  : reqData.employee_id,
    patient_id   : reqData.patient_id,
    date_time    : new Date(reqData.date_time),
    completed    : false
  };
  db.modifyApp(uid, params, (err, response, fields) => { //I assumed I had to pass uid separately from params.
    if (err) throw err;
    callBack(params);
  });
}

module.exports = {createApp, modifyApp};