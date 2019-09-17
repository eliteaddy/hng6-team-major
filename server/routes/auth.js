const express = require('express');
const signupUser = require('../controllers/signup');
const signinUser = require('../controllers/signin');
const validateSigninDetails = require('../middlewares/validatesignin');
const validateUser = require('../middlewares/validatenewuser');

const router = express.Router();

router.post('/signup', validateUser, signupUser);

router.post('/signin', validateSigninDetails, signinUser);

module.exports = router;
