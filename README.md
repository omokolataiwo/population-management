
# Population Management System 

This is a basic API built with express.js that allows a user to create locations, update locations, fetch locations and delete locations.

## Features
Create a location
   - Get specific locations
   - Update a location and population
   - Delete a location

   # Technologies

   -   [Express](https://expressjs.com/)  Fast, un-opinionated, minimalist web framework for Node.js
   -   [MongoDB](https://www.mongodb.com/)  MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need

   ## Setup - How to

   -   Clone this repository using the command
   -   Install dependencies with  `yarn install`
   -   Make sure to have mongodb installed and running if you intend testing locally  `mongod`
   -   Start the development server by running:  `yarn start:dev`

   ## Test

   Test were written using Mocha and Chai.

   -   Run  `yarn test`

   ## [](https://github.com/chykehyman/PMS#api-endpoints)API Endpoints

   <table>
   <tr><th>USE CASE</th><th>HTTP METHOD</th><th>ENDPOINT</th></tr>
   <tr>
   <td>Create a location</td>
   <td>POST</td>
   <td>/api/v1/location</td>
   </tr>
   <tr><td>Get a single location</td> <td>GET</td>  <td>/api/v1/location/:locationId</td></tr>
   <tr><td>Update a location</td> <td>PUT</td>  <td>/api/v1/location/locationId</td></tr>
   <tr><td>Delete a location</td> <td>DELETE</td>  <td>/api/v1/location/locationId</td></tr>
   </table>

   ## License 
   [MIT](https://github.com/chykehyman/PMS/blob/master/LICENSE)
   
