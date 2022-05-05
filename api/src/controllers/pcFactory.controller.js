const { request, response } = require('express');

const Product = require('../models/products.model');
const Store = require('../models/stores.model');

const { extractNotebooks, getNotebooksInfo } = require('../seeds/pcFactory.seed');

const loadNotebooks = async () => {
    const extractedNotebooks = await extractNotebooks();
    const notebooksInfoPromises = extractedNotebooks.map(async (notebookName) => {
        const notebookInfo = await getNotebooksInfo(notebookName);
        return notebookInfo;
    });
    const notebooksInfo = await Promise.all(notebooksInfoPromises);

    return notebooksInfo;
}

const createNotebooks = async (req = request, res = response) => {
    
    //store Data
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);
    //notebooks data
    const loadedNotebooks = await loadNotebooks();
    //create notebooks
  
    try {
        if (!store) {
            return res.status(404).json({
                ok: false,
                message: 'Store not found',
            });
        }
        else {
            //const savedNotebooks = await pcFactoryNotebooks.save();
            res.status(200).json({
                message: 'Notebooks loaded successfully',
                data: loadedNotebooks
            });
            //console.log('notebooksInfo ===>', loadedNotebooks);
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error loading notebooks. Check logs',
            error
        });
        console.log('error ===>', error);
    }

}

const getNotebooks = async (res = response, req = request) => {
    const notebooksInfo = await createNotebooks();
    res.status(200).json({
        message: 'Notebooks loaded successfully',
        notebooksInfo
    });

}

module.exports = {  createNotebooks, getNotebooks };