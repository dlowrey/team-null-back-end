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

/**
* endpoint: xxx/payments/[payment UID]
* Modifies the payment with [payment UID]
**/
router.put('/:uid', (req, res) => {
  manager.modifyPayment(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams);
  });
});

// export
module.exports = router
