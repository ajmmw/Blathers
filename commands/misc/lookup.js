exports.run = (client, message, args) => {
	switch (args[0].toLowerCase()) { //fix case-sensitivity
		// Fish Lookup
		case 'fish':
			if (args.length === 1) {
				return client.error(
					message.channel,
					'No Fish Given',
					`<@${message.author.id}> please supply the Fish Name.`
				);
			}
			value = args.slice(1).join(' ');
			Fish = client.getFish.get(value);
			if (!Fish) {
				return client.error(
					message.channel,
					'No Fish Found!',
					`<@${message.author.id}> there is no such Fish in our Museum right now.`
				);
			} else
				embed = new Discord.MessageEmbed()
					.setAuthor(`${Fish.name}`, null)
					.setDescription(`\`\`\`${Fish.quote}\`\`\``)
					.addField(`Price`, `${Fish.price} <:bells:698107158805348373>`, true)
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
				return client.error(
					message.channel,
					'No Bug Given',
					`<@${message.author.id}> please supply the Bug Name.`
				);
			}
			value = args.slice(1).join(' ');
			Bug = client.getBug.get(value);
			if (!Bug) {
				return client.error(
					message.channel,
					'No Bug Found!',
					`<@${message.author.id}> there is no such bug in our Museum right now.`
				);
			} else
				embed = new Discord.MessageEmbed()
					.setAuthor(`${Bug.name}`, null)
					.setDescription(`\`\`\`${Bug.quote}\`\`\``)
					.addField(`Price`, `${Bug.price} <:bells:698107158805348373>`, true)
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
				return client.error(
					message.channel,
					'No Fossil Given',
					`<@${message.author.id}> please supply the Fossil Name.`
				);
			}
			value = args.slice(1).join(' ');
			Fossil = client.getFossil.get(value);
			if (!Fossil) {
				return client.error(
					message.channel,
					'No Fossil Found!',
					`<@${message.author.id}> there is no such fossil in our Museum right now.`
				);
			} else
				embed = new Discord.MessageEmbed()
					.setAuthor(`${Fossil.name}`, null)
					.setDescription(`\`\`\`${Fossil.quote}\`\`\``)
					.addField(`Price`, `${Fossil.price} <:bells:698107158805348373>`, true)
					.setImage(Fossil.image)
					.setColor(client.getRandomColor());
			return message.channel.send(embed);

		// Villager Lookup
		case 'villager':
		case 'vil':
			if (args.length === 1) {
				return client.error(
					message.channel,
					'No Villager Given',
					`<@${message.author.id}> please supply the Villager Name.`
				);
			}
			value = args.slice(1).join(' ');
			Villager = client.getVillager.get(value);
			if (!Villager) {
				return client.error(
					message.channel,
					'No Villager Found!',
					`<@${message.author.id}> there is no such villager in our Museum right now.`
				);
			} else
				embed = new Discord.MessageEmbed()
					.setAuthor(`${Villager.name}`, null)
					.addField(`Gender`, Villager.gender, true)
					.addField(`Personality`, Villager.personality, true)
					.addField(`Species`, Villager.species, true)
					.addField(`Birthday`, Villager.birthday, true)
					.addField(`Sign`, Villager.sign, true)
					.addField(`Phrase`, Villager.phrase, true)
					.setThumbnail(Villager.portrait)
					.setColor(client.getRandomColor());
			return message.channel.send(embed);
		default:
			return client.error(
				message.channel,
				'No Type Selected!',
				`<@${message.author.id}> please supply a type to lookup.`
			);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: [ 'search' ],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'lookup',
	category: 'misc',
	description: 'Lookup a certain fish/bug from the Museum',
	usage: 'lookup <type> <name>',
	details: '<type> => The lookup type ie: fish or bug.\n<name> => The name of the fish or bug required to lookup.'
};
