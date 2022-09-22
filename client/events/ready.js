require("dotenv").config();
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { commands } = require("../deploy-commands");
// const { AutoPoster } = require("topgg-autoposter");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const CLIENT_ID = client.user.id;
    // const ap = AutoPoster(`${process.env.TOPGG_TOKEN}`, client);

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

        // ap.on("posted", (stats) => {
        //   console.log(`Posted stats to Top.gg! ${stats.serverCount} servers`);
        //   client.user.setActivity(`Serving ${stats.serverCount} servers~`);
        // });
      } catch (err) {
        if (err) console.error(err);
      }
    })();
  },
};
