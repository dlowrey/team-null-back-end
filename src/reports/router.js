const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic


/**
* endpoint: xxx/reports/daily
* Returns a JSONArray of all daily reports
**/
router.get('/', (req, res) => {
  manager.getAllDailyReports(req, (response) => {
    res.status(200);
    res.send(response);
  });
});



// export
module.exports = router
