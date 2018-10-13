// This event executes when a new member joins a server.

module.exports = (client, member) => {
    // Load the guild's settings
    const settings = client.getSettings(member.guild.id);

    // If welcome is off, don't proceed
    if (settings.welcomeEnabled !== 'true') return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag);

    // Send the welcome message to the welcome channel
    member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};