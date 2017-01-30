# AdverseEventsManagement
Code sample test for Semantic Bits

Pre-requisites:
- MongoDB
- NodeJS
- npm

To create Mongo collection and import data:  
`mongoimport --db semanticbits --collection events --drop --file ./sql/mongodb_adverse_events.json`

To install requisite node modules for the server:  
`npm install`

To run the server:  
`node server.js`

To run tests:  
`npm test`
