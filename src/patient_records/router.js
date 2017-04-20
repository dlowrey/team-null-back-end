const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic

/**
* endpoint: xxxx/router/[appointment_id]
* Modifys a patient record related to [appointment_id]
**/
router.put('/:uid', (req, res) => {
  manager.modifyRecord(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams); // send updated patient record parameters back
  });
});

/**
* endpoint: xxxx/router/[appointment_id]
* Responds with a patient record related to [appointment_id]
**/
router.get('/:uid', (req, res) => {
  manager.getRecordById(req, (response) => {
      res.status(200);
      res.send(response);
  });
});

// export
module.exports = router
