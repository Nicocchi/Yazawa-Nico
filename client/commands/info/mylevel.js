//  Description: Tells you your permission level for the current message location.
//  Usage: prefix arg1 arg2

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.channel.send(
    `${
      message.author.username
    }, your permission level is: ${level} - ${friendly}`
  );
};

exports.conf = {
  enabled: "false",
  guildOnly: "true",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscelaneous",
  description:
    "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
