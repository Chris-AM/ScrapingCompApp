const { Schema, model } = require('mongoose');

const productSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },

});