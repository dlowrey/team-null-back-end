const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic


/**
* endpoint: xxxx/appointments/
* Creates an appointment from the Appointments table
**/
router.post('/', (req, res) => {
  manager.createApp(req, (response) => {
    res.status(201);
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
* enpoint: xxx/appointments/uncompleted/[month]
* Returns a JSONArray of all uncompleted appointments for [month]
**/
router.get('/uncompleted/:month', (req, res) => {
  manager.getUncompApps(req, (response) => {
    res.status(200);
    res.send(response);
  });
});


/**
* enpoint: xxx/appointments/uncompleted/[month]
* Returns a JSONArray of all uncompleted appointments for [month]
**/
router.get('/patient/:uid', (req, res) => {
  manager.getAppsByPatient(req, (response) => {
    res.status(200);
    res.send(response);
  });
});



// export
module.exports = router
