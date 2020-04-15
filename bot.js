// Get Discord.js Ready
global.Discord = require("discord.js");
const client = new Discord.Client();

// Get Config
const config = require("./config.json");
client.config = config;

// JSON Fetch
global.fetch = require("node-fetch");

// SQLITE Databases
const SQLite = require("better-sqlite3");
global.UserSQL = new SQLite('./users.sqlite');
global.DataSQL = new SQLite('./database.sqlite');

// Load DBL API
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl.token, { webhookPort: 5000, webhookAuth: config.dbl.auth }, client);


// Commands Load
const fs = require("fs");
const Enmap = require("enmap");
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let commandName = file.split(".")[0];
        let props = require(`./commands/${file}`);
        client.commands.set(commandName, props);
    });
});

global.sentTrivia = new Set();

// Discord Login
client.login(config.token);