// * api/stores

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createStore, getStore, getStores } = require('../controllers/stores.controller');

const router = Router();

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('url', 'The url is required').not().isEmpty(),
    check('logo', 'The logo is required').not().isEmpty(),
    validateFields
], createStore);

router.get('/:id', getStore);

router.get('/', getStores);


module.exports = router;