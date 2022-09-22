const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription(
      "☆⌒ヽ(*'､^*)chu"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to kiss")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/kiss.json");
    const target = interaction.options.getUser("user");
    let msg = `You are kissing yourself...`;
    if (target) {
        if (target.id === client.id) {
            msg = "Oi! Don't touch me hentai!"
        } else {
            msg = `Awwe, ${interaction.user.username} is kissing ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `☆⌒ヽ(*'､^*)chu`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
