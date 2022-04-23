const { loadNotebooks, getNotebooks } = require('../controllers/pcFactory.controller');

const { Router } = require('express');

const router = Router();

router.post('/', loadNotebooks);
router.get('/', getNotebooks);

module.exports = router;