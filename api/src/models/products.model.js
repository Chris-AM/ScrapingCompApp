const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

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

ProductSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Product', ProductSchema);