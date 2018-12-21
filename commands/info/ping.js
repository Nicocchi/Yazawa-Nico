exports.run = async (client, message, args, level) => {
    // const msg = await message.channel.send('Ping?');
    // msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: ping,
    category: 'Miscelaneous',
    description: 'It pings like ping pong.',
    usage: 'ping'
};