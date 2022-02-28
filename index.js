'use strict';
require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('./deploy-commands');

// Set bot intents.
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({ partials: ['CHANNEL'], intents: myIntents });

// Import in bot commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Import in bot events
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, async (...args) => await event.execute(client, ...args));
    }
}

// Import server settings
try {
    client.serverDisabledSettings = require('./serversDisabledSettings.json')
} catch {
    client.serverDisabledSettings = {"autofix":[],"delete_original":[],"author_ping":[]};
    fs.writeFile('serversDisabledSettings.json', JSON.stringify(client.serverDisabledSettings), (err => {
        if (err) console.log(err);
    }))
}

client.login(process.env.BOT_TOKEN).then();
