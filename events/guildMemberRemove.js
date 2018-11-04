// This event executes when a new member leaves a server.

module.exports = (client, member) => {
    // Load the guild's settings
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(member.guild.id)) client.settings.set(member.guild.id, defaults);

    const settings = client.settings.get(member.guild.id);
    const username = member.user.username;

    // If leave is off, don't proceed
    if (settings.leaveEnabled !== 'true') return;

    // Replace the placeholders in the leave message with actual data
    const leaveMessage = settings.leaveMessage.replace('{{user}}', username);

    // Send the leave message to the leave channel
    member.guild.channels.find(c => c.id === settings.leaveChannel).send(leaveMessage).catch(console.error);
};