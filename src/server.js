const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const appointments = require('./appointments/router');
const patients = require('./patients/router');
const patientRecords = require('./patient_records/router');
const reports = require('./reports/router');
const employees = require('./employees/router');
const payments = require('./payments/router');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// router for appointments
app.use('/appointments', appointments);

// router for patients
app.use('/patients', patients);

// router for patient records
app.use('/records', patientRecords);

// router for reports
app.use('/reports', reports);

// router for employees
app.use('/employees', employees);

// router for payments
app.use('/payments', payments);