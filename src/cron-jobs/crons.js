const cron = require('node-cron');
const db = require('./db.js');
const mailer = require('../mailer.js');

/**
* markUncompleted: search for and mark uncompleted appointments at 8pm every
*                 day, then send out penalty payment emails
* ('0 0 21 * * *') = ('SEC MIN HOUR DAYMONTH MONTH DAYWEEK')
**/
const markUncompleted = cron.schedule('0 0 20 * * *', () => {
  console.log('CRON JOB: setting uncompleted appointments.\n');

  db.markUncompleted((err, response, fields) => { // db mark completed = 2
    if (err) console.log(err);
    db.sendPenalty((err, response, fields) => { // send emails
      if (err) console.log(err);
      for(let i = 0; i < response.length; i++) { // multiple missed apps
        mailer.sendPenalty(response[i]);
      }
    });
  });
}, true);


/**
* dailyReports: generate daily reports every day at 9pm
* ('0 0 21 * * *') = ('SEC MIN HOUR DAYMONTH MONTH DAYWEEK')
**/
const dailyReports = cron.schedule('0 0 21 * * *', () => {
  console.log('CRON JOB: gathering information for daily report')
  db.dailyReports((err, response, fields) => {
    console.log('Daily  Reports generated.');
  });
});

/**
* monthlyReports: generate previous monthly reports 1st of every month at 9pm
* ('0 0 0 1 * *') = ('SEC MIN HOUR DAYMONTH MONTH DAYWEEK')
**/
const monthlyReports = cron.schedule('0 0 0 1 * *', () => {
  console.log('CRON JOB: gathering information for monthly report')
  db.monthlyReports((err, response, fields) => {
    console.log('Monthly  Reports generated.');
  });
});

module.exports = {
  markUncompleted,
  dailyReports,
  monthlyReports,
}
