const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lewd")
    .setDescription(
      "O///O"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to lewd")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/lewd.json");
    const target = interaction.options.getUser("user");
    let msg = `You are lewding yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "Oi... I keep saying don't touch me you! Hentai! I'm calling the cops!!"
        } else {
            msg = `${interaction.user.username} is lewding ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `O///O`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
