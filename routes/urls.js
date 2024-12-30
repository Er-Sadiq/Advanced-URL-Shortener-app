const express = require('express');
const router = express.Router();
const { restrictToLoggedinUserOnly, checkAuth } = require('../middleware/authorize');
const { shortUrlHandler, analyticsHandler , getByShortIdHandler } = require('../services/urls');


router.post('/shorten', restrictToLoggedinUserOnly, shortUrlHandler);

router.get('/shorten/:shortId',getByShortIdHandler);

router.get('/analytics/:shortId', restrictToLoggedinUserOnly, analyticsHandler);

module.exports = router;
