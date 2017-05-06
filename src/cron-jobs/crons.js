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
  db.markUncompleted(completed, (response) => { // db mark completed = 2
    db.sendPenalty([completed, type],(response) => { // send emails
      for(let i = 0; i < response.length; i++) { // multiple missed apps
        mailer.sendPenalty(response[i]);
      }
    });
  });
});
