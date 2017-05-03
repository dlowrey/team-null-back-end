const mailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fakehealthcareforyou@gmail.com',
        pass: ''
    }
});

const sendInvoice = (data) => {

  let body = "Hello, and thank you for your recent visit to " +
             "team null's hospital. We hope you are satisfied with your " +
             "placebo treatment, we are sure you will be feeling better in " +
             "null time. Now for the stuff we really care about: " +
             "\n\nYour invoice total comes out to: $" + data.amount + ".\n\n" +
             "You can pay this using your online invoice number: " +
             data.id + " at [insert endpoint here]." +
             "\n\nThank you for your business,\nTeam Null"
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"FakeHealthcare" <fakehealthcareforyou@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Your Hospital Invoice', // Subject line
      text: body // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {sendInvoice};
