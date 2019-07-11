const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas, getSetGuild } = require('../helpers/routeHelpers');
const GuildsController = require('../controllers/guilds');

router.route('/profile')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.profile);

router.route('/set-prefix')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setPrefix);

router.route('/set-ban')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setBan);

router.route('/set-mute')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setMute);

router.route('/set-level')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setLevel);

router.route('/set-leave')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setLeave);

router.route('/set-leave-message')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setLeaveMessage);

router.route('/set-leave-channel')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setLeaveChannel);

router.route('/set-welcome')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setWelcome);

router.route('/set-welcome-message')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setWelcomeMessage);

router.route('/set-welcome-channel')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setWelcomeChannel);

router.route('/set-modlog')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setModlog);

router.route('/set-modlog-channel')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setModlogChannel);

router.route('/set-modrole')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setModRole);

router.route('/set-adminrole')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setAdminRole);

router.route('/set-warn')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setWarn);

router.route('/set-greeting-image')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.setGreetingImage);

router.route('/save-playlist')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.savePlaylist);

router.route('/playlist')
    .post(validateBody(schemas.authSchema), getSetGuild(), GuildsController.getPlaylist);

router.route('/set-oldgpf')
    .post(validateBody(schemas.authSchema), getSetGuild(schemas.authSchema), GuildsController.setNewGuild);
module.exports = router;