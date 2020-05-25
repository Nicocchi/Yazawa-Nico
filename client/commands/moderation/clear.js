const Discord = require("discord.js");
const axios = require("axios");

//  Description: Clear bulk messages.
//  Usage: clear <amount>
exports.run = async (client, message, args, level) => {
    try {
        // Check if author has proper permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: Unable to delete messages due to an error.\n \`You do not have the required permission: 'MANAGE_MESSAGES'\``);

    // If there isn't an amount specified, return error
    if(!args[0]) return message.channel.send(`:x: Unable to delete messages due to an error.\n \`Amount was not specified\``);

    // User's can only delete up to 50 messages at a time
    if(args[0] > 50) return message.channel.send(`:x: Unable to delete messages due to an error.\n \`Amount must not exceed 50\``);

    // Remove the messages
    const amount = Number(args[0]) + 1;
    try {
        message.channel.bulkDelete(amount).then(() => {
        message.channel.send(`Cleared ${args[0]} messages`).then(msg => msg.delete(5000));
    });
    } catch (e) {
        client.logger.error(`[channelCreate.js]: ${e}`);
    }
    

    // Configure embed
    let embed = new MessageEmbed()
        .setAuthor(`${client.user.username}'s ModLog`, `${client.user.avatarURL}`)
        .setDescription(`Bulk Delete in ${message.channel}, ${args[0]} messages deleted by **${message.author.username}#${message.author.discriminator}**`)
        .setColor('#FF4D9C')
        .setTimestamp();

    // Get guild profile
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
    const guild = guildRes.data.guild;

    // Set channel & check of modlog channel is available. If so, send embed
    // to the modlog channel, otherwise, send to default message channel
    if (guild.modLogChannel !== '' || guild.modLogChannel !== null || guild.modLogChannel !== undefined) {
        const channel = message.guild.channels.find(c => c.id === guild.modLogChannel);
        channel.send(embed);
    }

    } catch (e) {
        message.channel.send(`Unable to show clear log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Clear Log | ${e.response}\``);
    }
    
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