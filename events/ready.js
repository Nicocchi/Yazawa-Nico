const DBL = require("dblapi.js");
require("dotenv").config();

module.exports = async client => {
    // Log that the bot is online
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');

    // Make the bot have an activity
    client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {type: 'PLAYING'});

    const token = process.env.DBL_TOKEN || 'DBL Token'
    const dbl = new DBL(token, client);

    setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);

    dbl.on('posted', () => {
        client.logger.log('Server count posted');
    });

    dbl.on('error', e => {
        client.logger.error(`DBL: ${e}`);
    });
};