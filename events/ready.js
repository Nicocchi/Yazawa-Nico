module.exports = async client => {
    // Log that the bot is online
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');

    // Make the bot have an activity
    client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {type: 'PLAYING'});
};