const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic


router.put('/:uid', (req, res) => {
  manager.modifyRecord(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams); // send updated patient record parameters back
  });
});

// export
module.exports = router
