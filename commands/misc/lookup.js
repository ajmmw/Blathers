exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'Wrong Channel', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

	switch (args[0]) {
		// Fish Lookup
		case 'fish':
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Fish Name.`);
			}
			value = args.slice(1).join(' ');
			Fish = client.getFish.get(value);
			if (!Fish) {
				Fish = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
				let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
				for (const data of Fish) {
					output += `${data.name.toProperCase()} :: ${data.species}\n`;
				}
				if (Fish == 0) output += `Nothing found :: Try again`;
				return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
			}
			embed = new Discord.MessageEmbed()
				.setAuthor(`${Fish.name.toProperCase()}`, null)
				.setDescription(`\`\`\`${Fish.quote}\`\`\``)
				.addField(`Price`, `${Fish.price.toLocaleString()} ${client.emoji.bells}`, true)
				.addField(`Shadow Size`, `${Fish.size}`, true)
				.addField(`Time of Day`, `${Fish.time}`, true)
				.addField(`Location`, `${Fish.location}`, true)
				.addField(`Available (Northern Hemisphere)`, `${Fish.nh}`, false)
				.addField(`Available (Southern Hemisphere)`, `${Fish.sh}`, false)
				.setThumbnail(Fish.image)
				.setColor(client.getRandomColor());
			return message.channel.send(embed);

		// Bug Lookup
		case 'bug':
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Bug Name.`);
			}
			value = args.slice(1).join(' ');
			Bug = client.getBug.get(value);
			if (!Bug) {
				Bug = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
				let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
				for (const data of Bug) {
					output += `${data.name.toProperCase()} :: ${data.species}\n`;
				}
				if (Bug == 0) output += `Nothing found :: Try again`;
				return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
			}
			embed = new Discord.MessageEmbed()
				.setAuthor(`${Bug.name.toProperCase()}`, null)
				.setDescription(`\`\`\`${Bug.quote}\`\`\``)
				.addField(`Price`, `${Bug.price.toLocaleString()} ${client.emoji.bells}`, true)
				.addField(`Time of Day`, `${Bug.time}`, true)
				.addField(`Location`, `${Bug.location}`, true)
				.addField(`Available (Northern Hemisphere)`, `${Bug.nh}`, false)
				.addField(`Available (Southern Hemisphere)`, `${Bug.sh}`, false)
				.setThumbnail(Bug.image)
				.setColor(client.getRandomColor());
			return message.channel.send(embed);

		// Fossil Lookup
		case 'fossil':
		case 'fos':
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Fossil Name.`);
			}
			value = args.slice(1).join(' ');
			Fossil = client.getFossil.get(value);
			if (!Fossil) {
				Fossil = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
				let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
				for (const data of Fossil) {
					output += `${data.name.toProperCase()} :: ${data.species}\n`;
				}
				if (Fossil == 0) output += `Nothing found :: Try again`;
				return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
			}
			embed = new Discord.MessageEmbed()
				.setAuthor(`${Fossil.name.toProperCase()}`, null)
				.setDescription(`\`\`\`${Fossil.quote}\`\`\``)
				.addField(`Price`, `${Fossil.price.toLocaleString()} ${client.emoji.bells}`, true)
				.setThumbnail(Fossil.image)
				.setColor(client.getRandomColor());
			return message.channel.send(embed);
		default:
			return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply either \`fish | bug | fossil\`.`);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: ['search', 'l'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'lookup',
	category: 'misc',
	description: 'Lookup a certain fish/bug/fossil from the Museum',
	usage: 'lookup <type> <name>',
	details: '<type> => The lookup type ie: fish or bug.\n<name> => The name of the fish or bug required to lookup.'
};