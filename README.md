# Setting up the Express Server

1. Download the correct Node for your OS [here](https://nodejs.org/en/)
2. Navigate to desired directory and clone this repo
  ```
  C:\> cd C:\Projects
  C:\Projects> git clone https://github.com/NilsG-S/team-null-back-end.git
  ```
3. Navigate to `team-null-back-end/` and install Node dependencies
  ```
  C:\Projects> cd team-null-back-end
  C:\Projects\team-null-back-end> npm install
  ```
4. Navigate to `src\` and open `db-connection.js` in a text editor, in this file you will need to change the
  `user` and `password` parameters to match your MySQL Server username and password.
  ```Javascript
  const mysql = require('mysql');

  // Establish connection
  const connection = mysql.createConnection({
    host      :'localhost',
    user      :'root', // change this to your username
    password  :'password', // change this to your password
    database  :'healthcaredb',
    multipleStatements : true
  });

  // Export connection
  module.exports = connection;
  ```
5. Once all dependencies are done installing, you can start the server by entering:
  ```
  C:\Projects\team-null-back-end> npm start
  ```
  The server will not be able to interact with the MySQL Database unless the MySQL server is running and 
  the correct `healthcaredb` has been set up. Please see [Database README](https://github.com/NilsG-S/team-null-back-end/blob/master/Utils/README.md)

You can navigate to _localhost:3000/_ in your web browser and should get the text `Hello World!` on your screen. If you did not
get this text, please see the Command Window for any errors that may need fixing. 

**NOTE**: currently the only way to test enpoints in the healthcareserver is by using an application to send HTTP Requests
to localhost:3000/[enpoint here]. We use [Postman](https://www.getpostman.com/) to send HTTP Get, Post, Put, Delete methods to the 
running server. All POST content must be in **x-www-form-urlencoded** format.
