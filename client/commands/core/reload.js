//  Description: Releads a command that has been modified.
//  Usage: prefix arg1 arg2

exports.run = async (client, message, args, level) => {
    if(!args || args.length < 1) return message.reply('Must provide a command to reload. Nico....');

    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Error Unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (resposne) return message.reply(`Error Loading: ${response}`);

    message.reply(`The command \`${args[0]}\` has been reloaded`);
};

exports.conf = {
     enabled: 'true',
     guildOnly: 'false',
     aliases: [],
     permLevel: 'Bot Admin'
};

exports.help = {
     name: 'reload',
     category: 'System',
     description: 'Releads a command that has been modified.',
     usage: 'reload [command]'
};
