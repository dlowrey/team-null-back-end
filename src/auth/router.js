const express = require('express');
const router = express.Router();
const manager = require('./manager.js'); // Handle request logic

/**
* endpoint: xxxx/auth/
* Checks if there is a user with the specified id and password
**/
router.post('/', (req, res) => {
  manager.login(req, (response) => {
// If there is an id and password match, response.length cannot be 0.
    if (response.length != 0){
        res.status(200);
        res.send(response[0]);     // Index 0 of the response is sent so that response is an object, not an array.
    }
// If there is no match, response is an empty JSON, so response.length is 0.
    if (response.length == 0){
        res.status(401);
        res.send(response);        // This sends the empty JSON array
    }
  });
});

// export
module.exports = router
