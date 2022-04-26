const { Schema, model } = require('mongoose');

const StoreSchema = Schema({
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
            required: false,
        }
    ],

});

StoreSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Store', StoreSchema);