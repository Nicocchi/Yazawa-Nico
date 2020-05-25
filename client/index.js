require("dotenv").config();
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const YouTube = require("simple-youtube-api");

const client = new Discord.Client({ disableEveryone: true });

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "GOOGLE_API_KEY";

client.config = require("./config.js");

// Logger
client.logger = require("./modules/Logger");

// logs, elavation features, etc.
require("./modules/functions.js")(client);

// Aliases & commands
client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({ name: "settings" });

client.talkedRecently = new Set();

// Queue used to hold guild music queue
client.queue = new Map();

client.youtube = new YouTube(`${GOOGLE_API_KEY}`);

const init = async () => {
  // Load commands into memory as a collection

  // An array to store the base directory of the commands
  const cmdDirs = [
    "./commands/core",
    "./commands/currency",
    "./commands/fun",
    "./commands/games",
    "./commands/images",
    "./commands/info",
    "./commands/moderation",
    "./commands/set"
  ];

  // Loop thru the directories and then load the commands
  cmdDirs.forEach(async dir => {
    // Read each file in the directory
    const cmdFiles = await readdir(dir);

    // Log the process
    client.logger.log(
      `Loading a total of ${cmdFiles.length} commands in ${dir.substr(11)}`,
      "title"
    );

    // Loop thru each file in the directory and then load the command into the client
    cmdFiles.forEach(f => {
      // If the file is not a js file, return
      if (!f.endsWith(".js")) return;

      // Loads the file into the client with the command's name and directory
      const response = client.loadCommand(f, dir);
      if (response) client.logger.log(response);
    });
  });

  // Load events, which will include message & ready event
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
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
