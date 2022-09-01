const { SlashCommandBuilder } = require("discord.js");
const parseJSON = require("../../modules/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("facts")
    .setDescription("Gain equisite Love Live! knowledge!"),
  async execute(interaction) {
    const res = parseJSON("./JSON/facts.json");
    return interaction.channel.send({ content: res });
  },
};
