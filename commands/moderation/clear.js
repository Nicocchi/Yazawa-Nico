//  Description: kick a mentioned user.
//  Usage: ban <user> <reason>
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, defaults);
    const settings = client.settings.get(message.guild.id);

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to do that' +
        ' command.');
    if(!args[0]) return message.channel.send('There is no amount to delete');

    if(args[0] > 100) return message.channel.send('Too many messages. Only 100 and below');

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages`).then(msg => msg.delete(5000));
    });

    // If no modLogChannel, don't proceed
    const modLogChannel = message.guild.channels.find(c => c.id === settings.modLogChannel)
    if(!modLogChannel) return;
    if(message.author.bot) return;

    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.member.user.username}`)
        .setDescription(`${message.author.username} deleted ${args[0]} messages ${message.channel}`)
        .setTimestamp()
        .setFooter(
            `ID: ${message.author.id}`
        )
        .setColor("#FF4D9C");

    // Send the deleted message to the modlog channel
    modLogChannel.send(embed).catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "clear",
    category: "System",
    description: "Delete messages in bulk",
    usage: "clear <amount>"
};