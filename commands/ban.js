//  Description: Ban a mentioned user.
//  Usage: ban <user> <reason>
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, defaults);
    const settings = client.settings.get(message.guild.id);

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Can\'t ban users because you don\'t have permission');

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send('Couldn\'t find user');
    let reason = args.join(' ').slice(22);

    let banEmbed = new Discord.RichEmbed()
        .setDescription('Ban')
        .setColor('#FF4D9C')
        .addField('Banned User', `${bUser} with ID ${bUser.id}`)
        .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Banned In', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', reason);

    bUser.send(banEmbed);
    message.guild.member(bUser).ban(reason);
    message.guild.channels.find(c => c.id === settings.modLogChannel).send(banEmbed).catch(console.error);
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