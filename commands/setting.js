const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')
const fs = require('fs');
const _ = require('lodash')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setting')
        .setDescription('Change Fixtiktok bot settings')
        .addSubcommand( (subcommand) => subcommand
                .setName('autofix')
                .setDescription('Set automatic fixtiktok messages')
                .addBooleanOption( (option) => option
                    .setName('enabled')
                    .setDescription('Enable setting')
                    .setRequired(true))
        )
        .addSubcommand( (subcommand) => subcommand
            .setName('delete_original')
            .setDescription('Set deleting of original fixed TikTok message')
            .addBooleanOption( (option) => option
                .setName('enabled')
                .setDescription('Enable setting')
                .setRequired(true))
        )
        .addSubcommand( (subcommand) => subcommand
            .setName('author_ping')
            .setDescription('Set pinging of link author')
            .addBooleanOption( (option) => option
                .setName('enabled')
                .setDescription('Enable setting')
                .setRequired(true))
        ),
    execute: async function (client, interaction) {
        // "Manage Guild" permission is required for setting changes
        if (!interaction.member.permissionsIn(interaction.channel).has(Permissions.FLAGS.MANAGE_GUILD)) {
            await interaction.reply({content: "You do not have permission to use this command.", ephemeral: true})
            return;
        }

        const subcommandName = interaction.options.getSubcommand(true)
        const setEnable = interaction.options.getBoolean('enabled')
        const currentSettingEnabled = !client.serverDisabledSettings[subcommandName].includes(interaction.guildId)

        if (currentSettingEnabled && setEnable) {
            await interaction.reply(`Setting \`${subcommandName}\` is already enabled.`)
        } else if (!currentSettingEnabled && !setEnable) {
            await interaction.reply(`Setting \`${subcommandName}\` is already disabled.`)
        } else if (!currentSettingEnabled && setEnable) {
            _.remove(client.serverDisabledSettings[subcommandName], (serverID) => serverID === interaction.guildId)
            fs.writeFile('serversDisabledSettings.json', JSON.stringify(client.serverDisabledSettings), (err => {
                if (err) console.log(err);
            }))
            await interaction.reply(`Setting \`${subcommandName}\` is now enabled.`)
        } else if (currentSettingEnabled && !setEnable) {
            client.serverDisabledSettings[subcommandName].push(interaction.guildId)
            fs.writeFile('serversDisabledSettings.json', JSON.stringify(client.serverDisabledSettings), (err => {
                if (err) console.log(err);
            }))
            await interaction.reply(`Setting \`${subcommandName}\` is now disabled.`)
        }
    },
};