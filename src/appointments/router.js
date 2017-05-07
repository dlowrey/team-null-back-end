const express = require('express');
const manager = require('./manager.js'); // Handle request logic
const router = express.Router();



/**
* endpoint: xxxx/appointments/
* Creates an appointment from the Appointments table
**/
router.post('/', (req, res) => {
  manager.createApp(req, (response) => {
    res.status(201);
    res.setHeader('Access-Control-Expose-Headers', 'Location'); // allow access to Head
    res.location(response.insertId);
    res.send();
  });
});

/**
* endpoint: xxxx/appointments/[appointment UID]
* Updates a specified appointment from the Appointments table
**/

router.put('/:uid', (req, res) => {
  manager.modifyApp(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams);
  });
});


/**
* endpoint: xxxx/appointments/[appointment UID]
* Deletes a specified appointment from the Appointments table
**/

router.delete('/:uid', (req, res) => {
  manager.deleteApp(req, (response) => {
    res.status(204);
    res.send();
  });
});


/**
* endpoint: xxx/appointments/uncompleted/[month]
* Returns a JSONArray of all uncompleted appointments for [month]
**/
router.get('/uncompleted/:month', (req, res) => {
  manager.getUncompApps(req, (response) => {
    res.status(200);
    res.send(response);
  });
});


/**
* endpoint: xxx/appointments/patient/uncompleted/[patient UID]/[month]
* Returns a JSONArray of all uncompleted appointments for [patient UID] in [month]
**/
router.get('/patient/uncompleted/:uid/:month', (req, res) => {
  manager.getUncompAppsByPatient(req, (response) => {
    res.status(200);
    res.send(response);
  });
});


/**
* endpoint: xxx/appointments/patient/[patient UID]
* Returns a JSONArray of all appointments for [patient UID]
**/
router.get('/patient/:uid', (req, res) => {
  manager.getAppsByPatient(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

/**
* endpoint: xxx/appointments/doctor/uncompleted/[employee UID]/[month]
* Returns a JSONArray of all uncompleted appointments for
* [employee UID] in [month]
**/
router.get('/doctor/uncompleted/:uid/:month', (req, res) => {
  manager.getUncompAppsByDoctor(req, (response) => {
    res.status(200);
    res.send(response);
  });
});


// export
module.exports = router;
