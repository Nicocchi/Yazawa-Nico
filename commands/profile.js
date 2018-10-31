const Discord = require('discord.js')

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2

exports.run = async (client, message, args, level) => {
  const settings = message.settings;
  // const defaults = client.config.defaultUserSettings;
  const defaults = {
    'id': message.author.id,
    'username': `${message.author.username}`,
    'points': 0,
    'xp': 0,
    'level': 1,
    'daily': 'time', // Time of daily
    'dailyB': 'true',
    'isMuted': 'false',
    'afk': 'false',
    'afkMessage': 'I am AFK right now.',
    'isRPS': 'false',
    'isRPSGamble': 'false',
    'marriageProposals': [],
    'sentMarriageProposals': [],
    'marriages': [],
    'marriageSlots': 0,
    'isBuyingSlot': 'false'
  };
  const overrides = client.settings.get(message.author.id);
  const niiEmote = client.emojis.find('name', 'niconii');
  const niiLoveEmote = client.emojis.find('name', 'nicolove');
  if (!client.settings.has(message.author.id)) client.settings.set(message.author.id, defaults);

  let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Global Profile`)
    .setTimestamp()
    .setColor('#FF4D9C')
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter(`Server member since ${message.member.joinedAt}`, message.author.displayAvatarURL)
    .addField('Level & EXP', `${overrides.level}[${overrides.xp}/${overrides.xp}]`, true)
    .addField('Nico Nii\'s', `${overrides.points} ${niiEmote}`, true)
    .addField(`Marriages <:nicolove:451873491130646528>`, `None`);

  message.channel.send(embed);
};

exports.conf = {
  enabled: 'true',
  guildOnly: 'false',
  aliases: '[]',
  permLevel: 'User'
};

exports.help = {
  name: 'profile',
  category: 'Miscelaneous',
  description: 'Display User Profile Stats',
  usage: 'profile'
};
