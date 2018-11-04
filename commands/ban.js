//  Description: Ban a mentioned user.
//  Usage: ban <user> <reason>
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, defaults);
    const settings = client.settings.get(message.guild.id);

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Can\'t ban users because you don\'t have permission');

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send('Couldn\'t find user');
    let reason = args.join(' ').slice(22);

    let embed = new Discord.RichEmbed()
        .setDescription('Ban')
        .setColor('#FF4D9C')
        .addField('Banned User', `${user} with ID ${user.id}`)
        .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Banned In', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', reason);

    if(user) user.send(embed);
    message.guild.member(user).ban(reason);
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
    name: "ban",
    category: "System",
    description: "Bans a mentioned user",
    usage: "ban <user> <reason>"
};