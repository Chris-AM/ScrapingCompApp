const { Router } = require('express');
const { check } = require('express-validator');

const { loadNotebooks, getNotebooks } = require('../controllers/pcFactory.controller');


const router = Router();

router.post('/:id', [
    check('id', 'product id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('url', 'Url is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('summary', 'Summary is required').not().isEmpty(),
    check('store', 'Store is required').isMongoId(),
], loadNotebooks);
router.get('/', getNotebooks);

module.exports = router;