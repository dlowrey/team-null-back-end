const express = require('express');
const manager = require('./manager.js'); // Handle request logic

const router = express.Router();


/**
* endpoint: xxxx/auth/
* Checks if there is a user with the specified id and password
**/
router.post('/', (req, res) => {
  manager.login(req, (response) => {
    if (Object.keys(response).length !== 0) { // IF user credentials match
      res.status(200);
      res.send(response[0]);
    } else { // otherwise response is empty, invalid user credentials
      res.status(401);
      res.send();
    }
  });
});


// export
module.exports = router;
