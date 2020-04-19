exports.run = (client, message, args) => {
    message.author.send("https://discord.gg/TuEEkVc").catch(() => { return message.reply("Please unblock your DMs so I can send you the help commands.") });
    embed = new Discord.MessageEmbed()
        .setTitle(`Blathers Help`)
        .addField(`;lookup`, `Search the Museum database for a particular item/animal. \n\`;lookup fish Carp\` or \`;lookup fish Great White Shark\``)
        .addField(`;bells`, `Check your current Bells earned.`)
        .addField(`;fc`, `Share your Friend Code. \`;fc set <code>\``)
        .addField(`;top`, `Show the Top10 Bell earners in your server.`)
        .addField(`;gif`, `Display a random Animal Crossing GIF. \`Issues with API Key\``)
        .addField(`;info`, `Information about the bot.`)
        .addField(`;invite`, `Get a link to invite the bot to your server.`)
        .addField(`;q`, `Generate a random Trivia Question.`)
        .setColor(0xFF0092);
    message.author.send(embed).catch(() => { return });
};

module.exports.help = {
    name: 'help',
    category: 'info',
    description: 'Sends a DM with the current bot commands.',
    usage: ';help',
    aliases: [],
};