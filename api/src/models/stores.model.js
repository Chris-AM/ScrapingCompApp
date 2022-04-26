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
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],

});

ReceiverSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Store', storeSchema);