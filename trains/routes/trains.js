const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

router.get("/", trainController.handleGetTrains);

module.exports = router;