const fs = require("node:fs");
const { Collection } = require("discord.js");
const commands = [];

module.exports.deployCommands = (client) => {
  const commandDirs = [
    "./commands",
    "./commands/core",
    "./commands/currency",
    "./commands/fun",
    "./commands/general",
    "./commands/images",
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

  client.commands = new Collection();

  for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
};

module.exports.commands = commands;
