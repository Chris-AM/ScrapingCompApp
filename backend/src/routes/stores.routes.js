// api/stores

const { getStores, createStore } = require('../controllers/stores.controller');

const { Router } = require('express');

const router = Router();

router.get('/', getStores);
router.post('/', createStore);

module.exports = router;