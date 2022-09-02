require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { deployCommands } = require("./deploy-commands.js");

// Create a new client instance
const client = new Client({
  disableEveryone: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

module.exports = client;

// Deploy commands
deployCommands(client);

// Create events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

client.setMaxListeners(50);

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with token
client.login(process.env.TOKEN);
