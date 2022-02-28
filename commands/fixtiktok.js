const { SlashCommandBuilder } = require('@discordjs/builders');
const getFixtiktokURL = require('../src/getFixtiktokURL');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fixtiktok')
        .setDescription('Fix tiktok URL so that it will embed')
        .addStringOption((option) => option
            .setName('url')
            .setDescription('tiktok URL')
            .setRequired(true)),
    async execute(client, interaction) {
        const user_url = interaction.options.getString('url');
        const fixtiktokURL = getFixtiktokURL(user_url);
        if (fixtiktokURL) {
            interaction.reply(fixtiktokURL);
        }
        else {
            interaction.reply({content: 'No tiktok link could be found.', ephemeral: true});
        }
    },
};
