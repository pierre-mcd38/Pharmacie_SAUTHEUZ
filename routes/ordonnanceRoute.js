const express = require('express');
const router = express.Router();

router.get('/ordonnance', (req, res) => {
    res.render('ordonnance');
});

module.exports = router;