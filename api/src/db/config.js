const mongoose = require('mongoose');

const dbConnection = async () => {
    const connectionString = 'mongodb+srv://' +
        process.env.DB_USER_NAME + ':' + process.env.DB_PASSWORD + '@cluster0.jp9uu.mongodb.net/'
        + process.env.DB_DATABASE;
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected in scraping mode...');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database', error);
    }
}

module.exports = {
    dbConnection
};