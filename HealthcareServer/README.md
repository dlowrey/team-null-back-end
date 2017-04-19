# Setting up the Express Server

1. Download the correct Node for your OS [here](https://nodejs.org/en/)
2. Open a command prompt and navigate to the /Healthcareserver directory
4. Once inside /Healthcareserver, enter the command `npm install express`, press enter.
5. Next, enter the command `npm insall mysql`, press enter.
6. Finally, enter the command `npm install body-parser`, press enter.
7. Navigate to /Healthcareserver/src
8. You can now start the Express server with the command `node server.js`

You can navigate to _localhost:3000/_ in your web browser and should get the text `Hello World!` on your screen. If you did not
get this text, please see the Command window for any errors that may need fixing. 

*Note:* currently the only way to test enpoints in the healthcareserver is by using an application to send HTTP Requests
to localhost:3000/[enpoint here]. We use [Postman](https://www.getpostman.com/) to send HTTP Get, Post, Put, Delete methods to the 
running server.
