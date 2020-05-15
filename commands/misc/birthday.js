exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);
	
	const nth = function (d) {
		if (d > 3 && d < 21) return 'th';
		switch (d % 10) {
			case 1: return "st";
			case 2: return "nd";
			case 3: return "rd";
			default: return "th";
		}
	}
	const today = new Date();
	const date = today.getDate();
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];

	// Birthdays For Today
	if (args.length === 0) {
		villager = DataSQL.prepare("SELECT * FROM villager WHERE birthday = ?").get(`${month} ${date}${nth(date)}`);

		if (!villager) {
			return client.error(message.channel, 'ERROR', `No villager is having a birthday today!`);
		}

		message.channel.send(`**__:tada: Birthdays for ${month} ${date}${nth(date)} :tada:__**`);
		const bdays = DataSQL.prepare("SELECT * FROM villager WHERE birthday = ?;").all(`${month} ${date}${nth(date)}`);
		for (const data of bdays) {
			embed = new Discord.MessageEmbed()
				.setAuthor(`${data.name}`, null)
				.addField(`Gender`, data.gender, true)
				.addField(`Personality`, data.personality, true)
				.addField(`Species`, data.species, true)
				.addField(`Birthday`, data.birthday, true)
				.addField(`Sign`, data.sign, true)
				.addField(`Phrase`, data.phrase, true)
				.setThumbnail(data.portrait)
				.setFooter(`Info from Fandom WIKI | ;invite to add Blathers to your server`, null)
				.setColor(client.getRandomColor());
			message.channel.send(embed);
		}
	}

	// Birthdays For Month
	if (args.length > 0) {
		value = args.join(' ');
		const bdays = DataSQL.prepare("SELECT * FROM villager WHERE birthday LIKE ?").all(`%${value}%`);
		if (bdays == 0) 	return client.error(message.channel, `ERROR`, `No villager is having a birthday on/in this day/month`);
		let output = `= Birthdays for ${value} =\n\n`;
		for (const data of bdays) {
			output += `${data.name}${' '.repeat(10 - data.name.length)} :: ${data.birthday}\n`;
		}
		return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
	}
};

module.exports.conf = {
	enabled: true,
	aliases: ['bday'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'birthday',
	category: 'misc',
	description: 'Displays todays birthdays',
	usage: 'bday <month|day>',
	details: '<month|day> => Show all birthdays in that month or day.'
};