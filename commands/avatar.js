const Discord = require('discord.js');

//  Description: Display the user\' avatar.
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args, level) => {
    let aMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!aMember) return message.reply('You need to specify a user');

    let embed = new Discord.RichEmbed()
        .setTitle(`${aMember.user.username}'s Avatar`)
        .setImage(aMember.user.displayAvatarURL);

    message.channel.send({embed: embed});
};

exports.conf = {
     enabled: 'true',
     guildOnly: 'false',
     aliases: '[]',
     permLevel: 'User'
};

exports.help = {
     name: 'avatar',
     category: 'Miscelaneous',
     description: 'Display the user\' avatar.',
     usage: 'avatar [user]'
};


