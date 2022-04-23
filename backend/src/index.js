require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


const app = express();

//enable cors

app.use(cors());

const port = process.env.PORT || 3000;

dbConnection();

//routes
app.use('/api/stores', require('./routes/stores.routes'));

app.listen(port, () => {
  console.log('Server is running on port ' + port)
}); 