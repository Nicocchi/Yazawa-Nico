const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("laugh")
    .setDescription(
      "｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to laugh at")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/laugh.json");
    const target = interaction.options.getUser("user");
    let msg = `You are laughing`;
    if (target) {
        if (target.id === client.id) {
            msg = "Pfft ｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡"
        } else {
            msg = `Awwe, ${interaction.user.username} is laughing from ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
