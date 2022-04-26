const { request, response } = require('express');

const Store = require('../models/stores.model');

const createStore = async (req = request, res = response) => {
    const store = new Store({ ...req.body});
    try {
        const newStore = await store.save();
        res.status(200).json({
            ok: true,
            message: 'Store created successfully',
            newStore
        });
    } catch (error) {
        console.log('error ===> ', error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
        });
    }

}

const getStores = async (req, res = response) => {
    try { 
        const stores = await Store.find();
        res.status(200).json({
            ok: true,
            stores
        });
    } catch (error) {
        console.log('error ===> ', error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
        });
    }
}

const getStore = async (req, res = response) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id);
        res.status(200).json({
            ok: true,
            store
        });
    } catch (error) {
        console.log('error ===> ', error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
        });
    }
}

module.exports = {
    createStore,
    getStores,
    getStore
}