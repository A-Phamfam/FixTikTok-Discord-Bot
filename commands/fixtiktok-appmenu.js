const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const getFixtiktokURL = require('../src/getFixtiktokURL');
const {ApplicationCommandType} = require('discord-api-types/v9');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Fix Tiktok URL')
        .setType(ApplicationCommandType.Message),
    async execute(client, interaction) {
        const msg = await interaction.options.getMessage('message');
        const fixtiktokURL = getFixtiktokURL(msg);
        if (fixtiktokURL) {
            interaction.reply(fixtiktokURL);
        }
        else {
            interaction.reply({content: 'No tiktok link could be found.', ephemeral: true});
        }
    },
};
