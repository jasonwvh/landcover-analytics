const express = require('express');
const { getGeodata } = require('../controllers/geodata');

const router = express.Router();

router
    .route('/:year')
    .get(getGeodata)

module.exports = router;