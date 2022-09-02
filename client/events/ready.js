require("dotenv").config();
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { commands } = require("../deploy-commands");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const CLIENT_ID = client.user.id;

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log("Registering (/) commands.");

        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
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
  },
};
