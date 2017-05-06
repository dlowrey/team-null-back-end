const db = require('../db-connection');

/**
* markUncompleted: mark all uncompleted appointments for the day, setting
*                  their completed = 2
* param params: a jsonobject with {completed:}
**/
const markUncompleted = (params, callback) => {
  db.executeSQL("UPDATE appointments SET ? " +
                "WHERE DAY(date_time) = DAY(NOW());",
                params, (err, response, fields) => {
                  callback(response); // don't really care about the res.
                });
}

/**
* sendPenalty: select all of the payment and patient information
* for appointmnets who have completed = 2
* param info: a JSONARRAY of  [{completed status}, {payment type}]
**/
const sendPenalty = (info, callback) => {
  db.executeSQL("SELECT pa.amount, pa.id, p.email, a.date_time, " +
                "CONCAT(p.first_name, ' ', p.last_name) as name " +
                "FROM appointments as a " +
                "INNER JOIN patients as p " +
                "ON a.patient_id = p.id " +
                "INNER JOIN payments as pa " +
                "ON pa.appointment_id = a.id " +
                "WHERE ? AND ?;",
                info, callback);
}


const dailyReports = (callback) => {
  db.executeSQL( "INSERT INTO reports (type, doctor_name, " +
                 "patient_count, total_income) " +
                 "SELECT 1, CONCAT(e.first_name,' ', " +
                 "e.last_name), COUNT(a.patient_id), p.amount " +
                 "FROM appointments AS a " +
                 "INNER JOIN (SELECT appointment_id, SUM(amount) " +
                 "AS amount FROM payments GROUP BY " +
                 "appointment_id) AS p " +
                 "ON p.appointment_id = a.id " +
                 "INNER JOIN employees AS e ON e.id = " +
                 "a.employee_id " +
                 "WHERE DAY(a.date_time) = DAY(NOW()) " +
                 "GROUP BY a.employee_id; ", null, callback);
}

const monthlyReports = (callback) => {
  db.executeSQL( "INSERT INTO reports (type, doctor_name, " +
                  "patient_count, total_income) " +
                  "SELECT 2, r.doctor_name, COUNT(" +
                  "r.patient_count), SUM(r.total_income) " +
                  "FROM reports r " +
                  "WHERE MONTH(r.date_time) = MONTH(CURRENT_DATE " +
                  "- INTERVAL 1 MONTH) " +
                  "AND r.type = 1 " +
                  "GROUP BY r.doctor_name;",null, callback);
}



module.exports = {sendPenalty, markUncompleted, dailyReports};
