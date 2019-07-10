// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
  try {
    client.logger.cmd(
      `[GUILD LEAVE] ${guild.name} (${guild.id}) removed teh bot.`
    );
  } catch (e) {
    client.logger.error(`[guildDelete.js]: ${e}`);
  }
};
