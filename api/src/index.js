require('dotenv').config();

const express = require('express');
const cors = require('cors');

//const { dbConnection } = require('./db/config');


const app = express();

//enable cors

app.use(cors());

const port = 3100;

//dbConnection();

//routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Scraping Comp Flutter API'
    });
});
app.use('/api/stores/pc-factory', require('./routes/pcFactory.routes'));

app.listen(port, () => {
    console.log('Server is running on port ' + port)
}); 