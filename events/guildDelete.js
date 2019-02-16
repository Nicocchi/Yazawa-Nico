// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
  try {
    client.logger.cmd(
      `[GUILD LEAVE] ${guild.name} (${guild.id}) removed teh bot.`
    );

    // If the settings Enmap contains any guild overrides, remove them.
    if (client.settings.has(guild.id)) {
      client.settings.delete(guild.id);
    }
  } catch (e) {
    client.logger.error(e);
  }
};
