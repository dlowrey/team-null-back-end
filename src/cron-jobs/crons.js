const cron = require('node-cron');
const db = require('./db.js');
const mailer = require('../mailer.js');


let markUncompleted = cron.schedule('* * * * *', () => {
  console.log('CRON JOB: setting uncompleted appointments.');

  let completed = { completed : 2 };
  let type = { type : 3 };
  db.markUncompleted(completed, (response) => {
    db.sendPenalty([completed, type],(response) => {
      // loop through each record and send email
      for(let i = 0; i < response.length; i++) {
        mailer.sendPenalty(response[i]); // send the fields to the mailer
      }
    });
  });
});
