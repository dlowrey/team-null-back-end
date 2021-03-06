const mailer = require('nodemailer');
const credentials = require('./credentials.js');

// create reusable transporter object using the default SMTP transport
const transporter = mailer.createTransport(
  {
    service: 'gmail',
    auth: {
        user: credentials.email,
        pass: credentials.emailPass,
      },
  }
);

const sendInvoice = (data) => {
  const body = 'Hello, and thank you for your recent visit to ' +
             'team null\'s hospital. We hope you are satisfied with your ' +
             'placebo treatment, we are sure you will be feeling better in ' +
             'null time. Now for the stuff we really care about: ' +
             '\n\nYour invoice total comes out to: $' + data.amount + '.\n\n' +
             'You can pay this using your online invoice number: ' +
             data.id + ' at http://team-null.s3-website-us-west-2.amazonaws.com/#/invoice.' +
             '\n\nThank you for your business,\nTeam Null';
  // setup email data with unicode symbols
  const mailOptions = {
      from: '\'FakeHealthcare\' <fakehealthcareforyou@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Your Hospital Invoice', // Subject line
      text: body, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      }
      console.log('Invoice email sent to ' + data.email);
  });
};

const sendPenalty = (data) => {
  const body = 'Hello '+data.name+',\nYou have failed to complete your appointment on ' +
  data.date_time + '. As a result, you are being charged a penalty ' +
  'payment of $'+data.amount+'.  Please use the invoice number ' + data.id +
  ' to complete your payment online at http://team-null.s3-website-us-west-2.amazonaws.com/#/invoice.\n\nThank you!';
  // setup email data with unicode symbols
  const mailOptions = {
      from: '\'FakeHealthcare\' <fakehealthcareforyou@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Penalty Payment', // Subject line
      text: body, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      }
      console.log('Penalty email sent to ' + data.email);
  });
};



const sendReceipt = (data) => {
    const body = 'Hello, this is an automated receiept for ' + data.name +
               '.\n\nThank you for your business with Team null\'s Healthcare.\n\n' +
               'You payed your bill amount of ' + data.amount + ' in full ' +
               'on ' + data.date_paid + '\n\nWe hope to see you soon!';
    // setup email data with unicode symbols
    const mailOptions = {
        from: '\'FakeHealthcare\' <fakehealthcareforyou@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Invoice Receipt', // Subject line
        text: body, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log('Receipt email sent to ' + data.email);
    });
};

module.exports = {
  sendInvoice,
  sendReceipt,
  sendPenalty,
};
