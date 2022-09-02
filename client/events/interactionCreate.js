const client = require("../index");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
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
    }
}