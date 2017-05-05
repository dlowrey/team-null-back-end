const db = require('../db-connection');

const markUncompleted = (params, callback) => {
  db.executeSQL("UPDATE appointments SET ? " +
                "WHERE DAY(date_time) = DAY(NOW());",
                params, (err, response, fields) => {
                  callback(response);
                });
}

const sendPenalty = (info, callback) => {
  db.executeSQL("SELECT pa.amount, pa.id, p.email, a.date_time, " +
                "CONCAT(p.first_name, ' ', p.last_name) as name " +
                "FROM appointments as a " +
                "INNER JOIN patients as p " +
                "ON a.patient_id = p.id " +
                "INNER JOIN payments as pa " +
                "ON pa.appointment_id = a.id " +
                "WHERE ? AND ?;",
                info, (err, response, fields) => {
                  callback(response);
                });
}



module.exports = {sendPenalty, markUncompleted};
