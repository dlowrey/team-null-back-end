const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic

/**
* endpoint: xxxx/patients/
* Creates a Patient in the Patients table
**/
router.post('/', (req, res) => {
  manager.createPatient(req, (response) => {
    res.status(201);
    res.send();
  });
});

// export
module.exports = router
