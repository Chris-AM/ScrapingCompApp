const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');


const app = express();

const port = process.env.PORT || 3000;

dbConnection();

//routes
app.get('/', (req, res) => {
    res.json({
      msg: 'Hello World'
    });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port)
}); 