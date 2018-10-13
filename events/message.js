// Runs anytime a message is received
// Note: Due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {
    // Ignore bots
    if(message.author.bot) return;

    // Grab the settings for this server from Enmap
    // If there is no guild, get default conf (DMs)
    const settings = message.settings = client.getSettings(message.guild.id);

    // Checks if the bot was mentioned, with no message after it, retursn the prefix.
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if(message.content.match(prefixMention)) {
        return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
    }

    // Ignore any message that does not start with the prefix
    if(message.content.indexOf(settings.prefix) !== 0) return;

    // Seperate the 'command' name, and the 'arguments' for teh command.
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // If the member on a guild is invisible or not cached, fetch them.
    if(message.guild && !message.member) await message.guild.fetchMember(message.author);

    // Get the user or memeber's permission level from teh elevation
    const level = client.permlevel(message);

    // Check whether the command, or alias, exist in the collections defined
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(!cmd) return;

    // Some commands may not be useable in DMs. This check prevents those commands from running
    // and return a friendly error message.
    if(cmd && !message.guild && cmd.conf.guildOnly) {
        return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
    }
    
    if(level < client.levelCache[cmd.conf.permLevel]) {
        if(settings.systemNotice === 'true') {
            return message.channel.send(`You do not have permission to use this command. Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}) This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
        } else {
            return;
        }
    }

    // To simplify message arguments, the author's level is now put on level (not member so it is support in Dms)
    message.author.permLevel = level;

    message.flags = [];
    while(args[0] && args[0][0] === '-') {
        message.flags.push(args.shif().slice(1));
    }

    // If the command exists, **AND** the user has permission, run it
    client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
    cmd.run(client, message, args, level);
};