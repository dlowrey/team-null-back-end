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
    res.setHeader("Access-Control-Allow-Origin", "Location"); // allow access to Head
    res.location(response.insertId);
    res.send();
  });
});

/**
* endpoint: xxx/patients
* Returns a JSONArray of all patients
**/
router.get('/', (req, res) => {
  manager.getAllPatients(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

/**
* endpoint: xxx/patients/[patient UID]
* Returns patient information for [patient UID]
**/
router.get('/:uid', (req, res) => {
  manager.getPatientById(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

// export
module.exports = router
