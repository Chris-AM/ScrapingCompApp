// api/stores

const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        error: false,
        message: 'Welcome to stores API'
    })
});

module.exports = router;