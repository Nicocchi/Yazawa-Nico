require("dotenv").config();
const fs = require("node:fs");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Routes,
  Partials,
} = require("discord.js");
const { REST } = require("@discordjs/rest");

// Create a new client instance
const client = new Client({
  disableEveryone: true,
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Load commands
const commandDirs = [
  "./commands",
  "./commands/core",
  "./commands/currency",
  "./commands/fun",
  "./commands/general",
];

let commandFiles = [];

for (const directory in commandDirs) {
  fs.readdirSync(commandDirs[directory]).forEach((file) => {
    if (file.endsWith(".js")) {
      let fullFilename = `${commandDirs[directory]}/${file}`;
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
  if (interaction.isChatInputCommand()) {
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
  }

  return;
});

// Login to Discord with token
client.login(process.env.TOKEN);