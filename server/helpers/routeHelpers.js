const Joi = require('joi');
const User = require('../models/user');
const Guild = require('../models/guild');
const Global = require('../models/global');
const moment = require('moment');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            // console.log('[routeHelpers.js] VALIDATE_BODY\n', req.value);
            next();
        }
    },
    // Return user and create user if user does not exist
    getSetUser: (schema) => {
        return async (req, res, next) => {

            const { discord_id, name } = req.body;
            let foundUser = await User.findOne({ "local.discord_id": discord_id });

            if (!foundUser) {
                const user = {
                    discord_id,
                    name
                }
        
                foundUser = await createUser(user);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = req.body;
            req.value['body']['user'] = foundUser.local;

            next();
        }
    },
    // Return guild and create guild if guild does not exist
    getSetGuild: () => {
        return async (req, res, next) => {

            const { discord_id, name } = req.body;
            let foundGuild = await Guild.findOne({ "local.discord_id": discord_id });

            if (!foundGuild) {
                const guild = {
                    discord_id,
                    name
                };

                foundGuild = await createGuild(guild);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = req.body;
            req.value['body']['guild'] = foundGuild.local;

            next();
        }
    },
    // Return rip or set rip if rip global does not exist
    getRip: () => {
        return async (req, res, next) => {

            const { rip } = req.body;

            let foundGlobal = await Global.findOne({ "type": "Rip" });

            if (!foundGlobal) {
                const glob = {
                    type: "Rip",
                    totalRips: 0,
                    todaysRips: 0,
                    ripDateTime: null
                }

                foundGlobal = await createGlobal(glob);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = req.body;
            req.value['body']['global'] = foundGlobal;

            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            discord_id: Joi.string().required(),
            name: Joi.string().required(),
            xp: Joi.number(),
            level: Joi.number(),
            afk: Joi.boolean(),
            afk_value: Joi.boolean(),
            afkMessage: Joi.string(),
            prefix: Joi.string(),
            warningsBan: Joi.number(),
            warningsMute: Joi.number(),
            levelEnabled: Joi.boolean(),
            leaveEnabled: Joi.boolean(),
            leaveMessage: Joi.string(),
            leaveChannel: Joi.string(),
            welcomeEnabled: Joi.boolean(),
            welcomeMessage: Joi.string(),
            welcomeChannel: Joi.string(),
            modlog: Joi.boolean(),
            modlogChannel: Joi.string(),
            modrole: Joi.string(),
            adminrole: Joi.string(),
            warnUser: Joi.string(),
            warning: Joi.string(),
            rip: Joi.number(),
            mentioned_id: Joi.string(),
            sendAmount: Joi.number(),
            mentioned_name: Joi.string(),
            imageUrl: Joi.string(),
            playlist: Joi.array().items(),
            pfinfo: Joi.string(),
            userData: Joi.object().keys(),
        })
    }
};