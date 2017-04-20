const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic

/**
* endpoint: xxx/payments/[payment UID]
* Returns the payment associated with [payment UID]
**/
router.get('/:uid', (req, res) => {
  manager.getPaymentById(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

// export
module.exports = router
