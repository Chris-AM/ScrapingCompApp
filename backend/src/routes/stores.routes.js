// api/stores

const { getStores } = require('../controllers/stores.controller');

const { Router } = require('express');

const router = Router();

router.get('/', getStores);

module.exports = router;