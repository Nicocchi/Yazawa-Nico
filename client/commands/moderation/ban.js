const Discord = require("discord.js");
const axios = require('axios');

//  Description: Ban a mentioned user.
//  Usage: ban <user> <reason>
exports.run = async (client, message, args, level) => {
    try {
        // Get mentioned user, if none, return error
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`:x: Unable to ban user **undefined** due to an error.\n \`You must mention a user to ban\``);

    // Check if author has proper permissions
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: Unable to ban user **${user.user.username}** due to an error.\n \`You do not have the required permission: 'BAN_MEMBERS'\``);
    
    // Get reason. If none set, set default reason
    let reason = args.join(' ').slice(22);
    if (reason === '') reason = 'No reason given'

    // Configure embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}'s ModLog`, `${client.user.avatarURL}`)
        .setDescription(`User **${user.user.username}#${user.user.discriminator}** was banned by **${message.author.username}#${message.author.discriminator}** for:\n\n **${reason}**`)
        .setColor('#FF4D9C')
        .setTimestamp();

    // Send embed directly to banned user
    if(user) await user.send(embed);

    // Ban the user
    message.guild.member(user).ban(reason);

    // Get guild profile
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
    const guild = guildRes.data.guild;

    // Set channel & check of modlog channel is available. If so, send embed
    // to the modlog channel, otherwise, send to default message channel
    let channel = message.channel;
    if (guild.modLogChannel !== '' || guild.modLogChannel !== null || guild.modLogChannel !== undefined) {
        channel = message.guild.channels.find(c => c.id === guild.modLogChannel);
    }

    channel.send(embed);
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