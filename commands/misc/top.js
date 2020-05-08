exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);
	
	const top10 = UserSQL.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
	const embed = new Discord.MessageEmbed()
		.setTitle("Leaderboard")
		.setDescription("Our top 10 Bell leaders!")
		.setThumbnail(`https://pnkllr.net/projects/Blathers/balloon_float.gif`)
		.setColor(client.getRandomColor());

	for (const data of top10) {
		embed.addField(`${data.name}`, `${data.points} Bells (level ${data.level})`);
	}
	return message.channel.send(embed);
};

module.exports.conf = {
	enabled: true,
	aliases: ['ladder'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'top',
	category: 'misc',
	description: 'Display the current Top10 users with the most Bells on the server.',
	usage: 'top'
};