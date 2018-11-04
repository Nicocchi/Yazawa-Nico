//  Description: kick a mentioned user.
//  Usage: ban <user> <reason>
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, defaults);
    const settings = client.settings.get(message.guild.id);

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Can\'t kick user because you don\'t have permission');

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send('Couldn\'t find user');
    let reason = args.join(' ').slice(22);

    let embed = new Discord.RichEmbed()
        .setDescription('Kick')
        .setColor('#FF4D9C')
        .addField('Kicked User', `${user} with ID ${user.id}`)
        .addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Kicked In', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', reason);

    if(user) user.send(embed);
    message.guild.member(user).kick(reason);
    const channel = message.guild.channels.find(c => c.id === settings.modLogChannel)
    if(!channel) return message.channel.send(embed);
    channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: '[]',
    permLevel: "User"
};

exports.help = {
    name: "kick",
    category: "System",
    description: "Kicks a mentioned user",
    usage: "kick <user> <reason>"
};