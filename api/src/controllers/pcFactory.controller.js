const { request, response } = require('express');

const Product = require('../models/products.model');
const Store = require('../models/stores.model');

const { extractNotebooks, getNotebooksInfo } = require ('../seeds/pcFactory.seed');

const loadNotebooks = async (req = request, res = response) => {
    const extractedNotebooks = await extractNotebooks();
    const notebooksInfoPromises = extractedNotebooks.map(async (notebookName) => {
        const notebookInfo = await getNotebooksInfo(notebookName);
        return notebookInfo;
    }
    );
    const notebooksInfo = await Promise.all(notebooksInfoPromises);
    
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);

    if(!store) {
        return res.status(404).json({
            ok: false,
            message: 'Store not found',
        });
    }
    else {
        res.status(200).json({
            message: 'Notebooks loaded successfully',
            data: notebooksInfo
        });
        console.log('notebooksInfo ===>', notebooksInfo);
        return notebooksInfo;
    }

}

const getNotebooks = async (res = response, req = request) => {
    const notebooksInfo = await loadNotebooks();
    res.status(200).json({
        message: 'Notebooks loaded successfully',
        notebooksInfo
    });
    
}

module.exports = { loadNotebooks, getNotebooks };