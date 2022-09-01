require("dotenv").config();
const fs = require("node:fs");
const { Client, Collection, GatewayIntentBits, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

const Enmap = require("enmap");

// Create a new client instance
const client = new Client({
  disableEveryone: true,
  intents: [GatewayIntentBits.GuildMembers],
});

client.config = require("./config.js");
client.logger = require("./modules/Logger");

// logs, elavation features, etc.
require("./modules/functions.js")(client);

// Aliases & commands
client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({ name: "settings" });

client.talkedRecently = new Set();

// Load normal commands into memory as a collection

// An array to store the base directory of the commands
const cmdDirs = [
  "./commands/core",
  "./commands/currency",
  "./commands/fun",
  "./commands/games",
  "./commands/images",
  "./commands/info",
  "./commands/lovelive",
  "./commands/moderation",
  "./commands/set",
];

// Loop thru the directories and then load the commands
cmdDirs.forEach(async (dir) => {
  // Read each file in the directory
  const cmdFiles = fs.readdirSync(dir);

  // Log the process
  client.logger.log(
    `Loading a total of ${cmdFiles.length} commands in ${dir.substr(11)}`,
    "title"
  );

  // Loop thru each file in the directory and then load the command into the client
  cmdFiles.forEach((f) => {
    // If the file is not a js file, return
    if (!f.endsWith(".js")) return;

    // Loads the file into the client with the command's name and directory
    const response = client.loadCommand(f, dir);
    if (response) client.logger.log(response);
  });
});

// Load events, which will include message & ready event
const evtFiles = fs.readdirSync("./events/");
client.logger.log(`Loading a total of ${evtFiles.length} events.`);
evtFiles.forEach((file) => {
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

client.logger.log(`Loading slash commands`)

// Load slash commands
const slashCommandDirs = ["./slash_commands", "./slash_commands/core"];

let commandFiles = [];

for (const directory in slashCommandDirs) {
  fs.readdirSync(slashCommandDirs[directory]).forEach((file) => {
    if (file.endsWith(".js")) {
      let fullFilename = `${slashCommandDirs[directory]}/${file}`;
      commandFiles.push(fullFilename);
    }
  });
}

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(file);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

// Client ready
client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  const CLIENT_ID = client.user.id;

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      console.log("Registering (/) commands.");

      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
          body: commands,
        });
        console.log("Successfully registered (/) commands globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          { body: commands }
        );
        console.log("Successfully registered (/) commands locally");
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "An error occured while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with token
client.login(process.env.TOKEN);

// const { promisify } = require("util");
// const readdir = promisify(require("fs").readdir);
// const Enmap = require("enmap");
// client.config = require("./config.js");

// // Logger
// client.logger = require("./modules/Logger");

// // logs, elavation features, etc.
// require("./modules/functions.js")(client);

// // Aliases & commands
// client.commands = new Enmap();
// client.aliases = new Enmap();

// client.settings = new Enmap({ name: "settings" });

// client.talkedRecently = new Set();

// // Queue used to hold guild music queue
// client.queue = new Map();

// const init = async () => {
  // // Load commands into memory as a collection
  // // An array to store the base directory of the commands
  // const cmdDirs = [
  //   "./commands/core",
  //   "./commands/currency",
  //   "./commands/fun",
  //   "./commands/games",
  //   "./commands/images",
  //   "./commands/info",
  //   "./commands/lovelive",
  //   "./commands/moderation",
  //   "./commands/set",
  // ];
  // Loop thru the directories and then load the commands
  // cmdDirs.forEach(async (dir) => {
  //   // Read each file in the directory
  //   const cmdFiles = await readdir(dir);
  //   // Log the process
  //   client.logger.log(
  //     `Loading a total of ${cmdFiles.length} commands in ${dir.substr(11)}`,
  //     "title"
  //   );
  //   // Loop thru each file in the directory and then load the command into the client
  //   cmdFiles.forEach((f) => {
  //     // If the file is not a js file, return
  //     if (!f.endsWith(".js")) return;
  //     // Loads the file into the client with the command's name and directory
  //     const response = client.loadCommand(f, dir);
  //     if (response) client.logger.log(response);
  //   });
  // });
  // Load events, which will include message & ready event
  // const evtFiles = await readdir("./events/");
  // client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  // evtFiles.forEach((file) => {
  //   const eventName = file.split(".")[0];
  //   client.logger.log(`Loading Event: ${eventName}`);
  //   const event = require(`./events/${file}`);
  // Bind the client to any event, before the existing arguments
  //   client.on(eventName, event.bind(null, client));
  // });
  // Generate a cache of client permissions
  // client.levelCache = {};
  // for (let i = 0; i < client.config.permLevels.length; i++) {
  //   const thisLevel = client.config.permLevels[i];
  //   client.levelCache[thisLevel.name] = thisLevel.level;
  // }
  // Login the client
  // client.login(client.config.token);
  // End top-level async/await func
// };

// init();
