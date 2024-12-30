const express = require('express');
const { signUpHandler, loginHandler } = require('../services/auth');


const router = express.Router();



router.post('/', signUpHandler);

router.post('/login', loginHandler);




module.exports = router;