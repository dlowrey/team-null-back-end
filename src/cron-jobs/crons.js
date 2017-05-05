const cron = require('node-cron');
const db = require('./db.js');
const mailer = require('../mailer.js');

let task = cron.schedule('00 * * * * *', () => {
  console.log('CRON JOB: finding uncompleted appointments');
  // send email to all payment records type 3

  let type = { type : 3};
  let completed = { completed : 2 };
  db.sendPenalty([completed, type],(response) => {
    // loop through each record and send email
    for(let i = 0; i < response.length; i++) {
        mailer.sendPenalty([i]); // send the fields to the mailer
    }
  });
}, true);

task.start();
