const express = require('express');
const { getGeodata } = require('../controllers/geodata');

const router = express.Router();

// route to controller
router
    .route('/:location/:year')
    .get(getGeodata)

module.exports = router;