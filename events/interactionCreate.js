const { slashExecute } = require('./slashInteraction');
const { contextMenuExecute } = require('./contextMenuInteraction');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
    // Route each interaction type to the proper interaction behavior

        // Slash command interaction
        if (interaction.isCommand()) {
            await slashExecute(client, interaction);
        }

        if (interaction.isContextMenu()) {
            await contextMenuExecute(client, interaction);
        }
    },
};
