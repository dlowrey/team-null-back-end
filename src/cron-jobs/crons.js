const cron = require('node-cron');
const db = require('./db.js');
const mailer = require('../mailer.js');

/**
* markUncompleted: search for and mark uncompleted appointments at 9pm every
*                 day, then send out penalty payment emails
* ('0 21 * * *') = ('MIN HOUR DAYMONTH MONTH DAYWEEK')
**/
const markUncompleted = cron.schedule('0 21 * * *', () => {
  console.log('CRON JOB: setting uncompleted appointments.');

  let completed = { completed : 2 }; // completed status for missed apps.
  let type = { type : 3 }; // type of payment for penalties
  db.markUncompleted(completed, (err, response, fields) => { // db mark completed = 2
    if (err) console.log(err);
    db.sendPenalty([completed, type],(err, response, fields) => { // send emails
      if (err) console.log(err);
      for(let i = 0; i < response.length; i++) { // multiple missed apps
        mailer.sendPenalty(response[i]);
      }
    });
  });
});


const dailyReports = cron.schedule('0 21 * * *', () => {
  db.dailyReports((err, response, fields) => {
    console.log(fields);
  });
});


const monthlyReports = cron.schedule('0 21 * * *', () => {
  db.monthlyReports((err, response, fields) => {
    console.log(fields);
  });
});
