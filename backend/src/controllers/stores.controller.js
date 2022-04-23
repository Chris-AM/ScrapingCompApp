
const { request, response } = require('express');

const getStores = async (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        message: 'Get all stores',
        stores: [{
            id: 1,
            name: 'Tienda 1',
            url: 'https://www.tienda1.com',
        }
        ]
    });
};

const createStore = async (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        message: 'Create a new store',
    });
};

module.exports = {
    getStores,
    createStore
};