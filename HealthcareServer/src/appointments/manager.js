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


module.exports = {createApp};
