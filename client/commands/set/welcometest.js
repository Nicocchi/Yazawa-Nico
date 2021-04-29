const Discord = require('discord.js');

//  Description: Display the user\' avatar.
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args) => {

    // client.settings.set(message.author.id, 1, 'level');
    // client.settings.set(message.author.id, args[0], 'xp');


    // message.channel.send(`${message.author.tag} has set current xp to ${args[0]}`);
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: Unable to show welcome message due to an error.\n \`You do not have the required permission: 'MANAGE_SERVER'\``);

    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
};

exports.conf = {
    enabled: 'true',
    guildOnly: 'false',
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'welcometest',
    category: 'Administration',
    description: 'Welcome Test',
    usage: 'welcometest'
};