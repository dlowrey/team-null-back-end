const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic


/**
* endpoint: xxx/reports/daily
* Returns a JSONArray of all daily reports
**/
router.get('/daily', (req, res) => {
  manager.getAllDailyReports(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

/**
* endpoint: xxx/reports/monthly
* Returns a JSONArray of all monthly reports
**/
router.get('/monthly', (req, res) => {
  manager.getAllMonthlyReports(req, (response) => {
    res.status(200);
    res.send(response);
  });
});



// export
module.exports = router
