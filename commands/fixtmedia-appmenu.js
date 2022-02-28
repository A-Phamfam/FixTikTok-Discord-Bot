const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const getFixDiscordMedia = require('../src/getFixDiscordMedia');
const {ApplicationCommandType} = require('discord-api-types/v9');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Fix Discord Video Embed')
        .setType(ApplicationCommandType.Message),
    async execute(client, interaction) {
        const msg = await interaction.options.getMessage('message');
        const discordMediaURL = await getFixDiscordMedia(msg);
        if (discordMediaURL) {
            await interaction.reply(discordMediaURL);
        }
        else {
            await interaction.reply({content: 'No discord media video link could be found.', ephemeral: true});
        }
    },
};
