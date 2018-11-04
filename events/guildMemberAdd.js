// This event executes when a new member joins a server.

module.exports = (client, member) => {
    // Load the guild's settings
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(member.guild.id)) client.settings.set(member.guild.id, defaults);

    const settings = client.settings.get(member.guild.id);

    // If welcome is off, don't proceed
    if (settings.welcomeEnabled !== 'true') return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace('{{user}}', `<@${member.user.id}>`);

    // Send the welcome message to the welcome channel
    member.guild.channels.find(c => c.id === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};