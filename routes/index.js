const express = require('express');
const router = express.Router();

router.get('/', (request, responce) => {
    responce.json('Главная');
});

module.exports = router;