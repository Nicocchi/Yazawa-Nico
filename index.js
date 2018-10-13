const Discord = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

const client = new Discord.Client();

client.config = require('./config.js');

// Logger
client.logger = require('./modules/Logger');

// logs, elavation features, etc.
require('./modules/functions.js')(client);

// Aliases & commands
client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({name: 'settings'});

const init = async () => {
    // Load commands into memory as a collection
    const cmdFiles = await readdir('./commands/');
    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if(!f.endsWith('.js')) return;
        const response = client.loadCommand(f);
        if(response) console.log(response);
    });

    // Load events, which will include message & ready event
    const evtFiles = await readdir('./events/');
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split('.')[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);

        // Bind the client to any event, before the existing arguments
        client.on(eventName, event.bind(null, client));
    });

    // Generate a cache of client permissions
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    // Login the client
    client.login(client.config.token);
// End top-level async/await func
};

init();