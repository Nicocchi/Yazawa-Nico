const { MessageEmbed } = require("discord.js");
const axios = require('axios');

//  Description: Ban a mentioned user.
//  Usage: ban <user> <reason>
exports.run = async (client, message, args, level) => {
    try {
        // Get mentioned user, if none, return error
    let user = message.guild.member(message.mentions.users.first());
    if(!user) return message.channel.send(`:x: Unable to ban user **undefined** due to an error.\n \`You must mention a user to ban\``);

    // Check if author has proper permissions
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: Unable to ban user **${user.user.username}** due to an error.\n \`You do not have the required permission: 'BAN_MEMBERS'\``);
    
    // Get reason. If none set, set default reason
    let reason = args.join(' ').slice(22);
    if (reason === '') reason = 'No reason given'

    const username = `${user.user.username}#${user.user.discriminator}`

    // Ban the user
    // message.guild.members.ban(user.id);

    user.ban(reason).then(() => {
        message.channel.send(`Banned ${username}`)
    }).catch(err => {
        message.channel.send(`Unable to ban ${username}`)
    })

    } catch (error) {
        client.logger.error(error);
        message.channel.send(`Unable to show ban log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Ban Log | ${error.response}\``);
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ban",
    category: "System",
    description: "Bans a mentioned user",
    usage: "ban <user> <reason>"
};