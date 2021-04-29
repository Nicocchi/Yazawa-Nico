// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  try {
    client.logger.cmd(
      `[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${
        guild.owner.user.tag
      } (${guild.owner.user.id})`
    );
  } catch (e) {
    client.logger.error(`[guildCreate.js]: ${e}`);
  }
};
