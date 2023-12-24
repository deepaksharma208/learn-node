// use packages
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const newRouter = require('./router.js');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017') // This is the location of where your local database is living.
  .then((client) => {
    const db = client.db('clocking_system'); // The name we gave our DB
    const staffCollection = db.collection('staff'); // The name we gave our collection inside the DB
    const staffRouter = newRouter(staffCollection); // We haven't built the router functionality yet, but we will next!

    app.use('/api/staff', staffRouter); // Defining the base route where we can later access our data
  })
  .catch(console.err);

app.listen(4000, function () {
  console.log(`Listening on this port: ${this.address().port}`);
});
