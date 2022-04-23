const { Schema, model } = require('mongoose');

const storeSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true, 
    },
});

module.exports = model('Store', storeSchema);