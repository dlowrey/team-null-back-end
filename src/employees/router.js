const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic


/**
* endpoint: xxx/employees/doctors
* Returns a JSONArray of all doctors
**/
router.get('/doctors', (req, res) => {
  manager.getAllDoctors(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

// export
module.exports = router
