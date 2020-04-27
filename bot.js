// Get Discord.js Ready
global.Discord = require('discord.js');
const client = new Discord.Client();

// Get Config
const config = require('./config');
client.config = config;

// JSON Fetch
global.fetch = require('node-fetch');

// SQLITE Databases
const SQLite = require('better-sqlite3');
global.UserSQL = new SQLite('./users.sqlite');
global.DataSQL = new SQLite('./database.sqlite');

// Load DBL API
const DBL = require('dblapi.js');
const dbl = new DBL(config.dbl.token, { webhookPort: 5000, webhookAuth: config.dbl.auth }, client);

// Get Functions
require('./src/functions')(client);

// Commands Load
const fs = require('fs');
const Enmap = require('enmap');
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir('./commands/', (err, folders) => {
	if (err) {
		return console.error(err);
	}

	for (let i = 0; i < folders.length; i++) {
		fs.readdir(`./commands/${folders[i]}/`, (error, files) => {
			if (error) {
				return console.error(error);
			}
			files.forEach((file) => {
				if (!file.endsWith('.js')) {
					return;
				}

				const props = require(`./commands/${folders[i]}/${file}`);
				const commandName = props.help.name;
				console.log(`Attempting to load command ${commandName}`);
				client.commands.set(commandName, props);

				if (props.conf.aliases) {
					props.conf.aliases.forEach((alias) => {
						client.aliases.set(alias, commandName);
					});
				}
			});
		});
	}
});

client.levelCache = {};
for (let i = 0; i < config.permLevels.length; i++) {
	const thislvl = config.permLevels[i];
	client.levelCache[thislvl.name] = thislvl.level;
}

global.sentTrivia = new Set();

// Discord Login
client.login('Njc0NzUzMTk3OTc3NTAxNzU2.XjtK-g.GvxqYQ2MMZZ-xD8OALrzLFxBBgQ');
