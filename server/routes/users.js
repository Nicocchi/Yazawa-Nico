const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas, getSetUser, getUser } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

router.route('/profile')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.profile);

router.route('/profile2')
    .post(validateBody(schemas.authSchema), getUser(schemas.authSchema), UsersController.profile);

router.route('/gainxp')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.gainXP);

router.route('/setafk')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.setAFK);

router.route('/setafkmessage')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.setAFKMessage);

router.route('/daily')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.daily);

router.route('/send')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.sendLoveGems);

router.route('/marry')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.marry);

router.route('/acceptmarriage')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.acceptMarriage);

router.route('/declinemarriage')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.declineMarriage);

router.route('/divorce')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.divorce);

router.route('/buymarriageslot')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.buyMarriageSlot);

router.route('/setprofileimage')
    .post(validateBody(schemas.authSchema), getUser(schemas.authSchema), UsersController.setProfileImage);

router.route('/set-pfinfo')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.setProfileText);

router.route('/set-oldpf')
    .post(validateBody(schemas.authSchema), getSetUser(schemas.authSchema), UsersController.setNewUser);
module.exports = router;