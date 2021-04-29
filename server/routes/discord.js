const express = require('express');
const router = require('express-promise-router')();

const Auth = require('../controllers/auth');

router.route('/login')
    .get(Auth.login);

router.route('/callback')
    .get(Auth.callback);

module.exports = router;