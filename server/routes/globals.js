const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas, getRip } = require('../helpers/routeHelpers');
const GlobalsController = require('../controllers/globals');

router.route('/rip')
    .post(validateBody(schemas.authSchema), getRip(), GlobalsController.setRip);

module.exports = router;