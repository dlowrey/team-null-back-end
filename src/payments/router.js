const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic

/**
* endpoint: xxx/payments/[payment uid]
* Returns the payment associated with [payment uid]
**/
router.get('/:uid', (req, res) => {
  manager.getPaymentById(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

/**
* endpoint: xxx/payments/[payment appointment_id]
* Returns the payment associated with [payment appointment_id]
**/
router.get('/appointment/:appointment_id', (req, res) => {
  manager.getCopayByApp(req, (response) => {
    res.status(200);
    res.send(response);
  });
});

/**
* endpoint: xxx/payments/[payment appointment_id]
* Modifies the payment with [payment appointment_id]
**/
router.put('/copay/:appointment_id', (req, res) => {
  manager.modifyCopay(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams);
  });
});

/**
* endpoint: xxx/payments/[payment appointment_id]
* Modifies the payment with [payment appointment_id]
**/
router.put('/:uid', (req, res) => {
  manager.modifyPaymentById(req, (updatedParams) => {
    res.status(200);
    res.send(updatedParams);
  });
});

// export
module.exports = router
