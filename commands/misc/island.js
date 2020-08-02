exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

	switch (args[0]) {
		// Set Character Name
		case 'character':
		case 'char':
			User = client.getIsland.get(message.author.id);
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please supply your Characters Name.`);
			}
			if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null, turnip_price: null, dodo_code: null, dodo_time: null } }
			char = args.slice(1).join(' ');
			User.character = char;
			client.setIsland.run(User);
			return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your characters name to your Island Information.`);

		// Set Island Name
		case 'name':
			User = client.getIsland.get(message.author.id);
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please supply your Island Name.`);
			}
			if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null, turnip_price: null, dodo_code: null, dodo_time: null } }
			name = args.slice(1).join(' ');
			User.name = name;
			client.setIsland.run(User);
			return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your islands name to your Island Information.`);

		// Set Island Fruit
		case 'fruit':
			User = client.getIsland.get(message.author.id);
			if (args.length === 1) {
				return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please supply your Island Fruit.`);
			}
			fruit = args[1].toLowerCase();
			switch (fruit) {
				case 'apple':
				case 'cherry':
				case 'orange':
				case 'peach':
				case 'pear':
					if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null, turnip_price: null, dodo_code: null, dodo_time: null } }
					User.fruit = fruit.toProperCase();
					client.setIsland.run(User);
					return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your island fruit to your Island Information.`);
				default:
					return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please provide either \`apple | cherry | orange | peach | pear\``);
			}

		// Set Island Location
		case 'location':
		case 'loc':
			switch (args[1]) {
				case 'northern':
				case 'north':
					User = client.getIsland.get(message.author.id);
					if (args.length === 1) {
						return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please supply your Islands Location.`);
					}
					if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null, turnip_price: null, dodo_code: null, dodo_time: null } }
					loc = args[1];
					User.hemisphere = 'Northern';
					client.setIsland.run(User);
					return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your Islands Location to your Island Information.`);
				case 'southern':
				case 'south':
					User = client.getIsland.get(message.author.id);
					if (args.length === 1) {
						return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please supply your Islands Location.`);
					}
					if (!User) { User = { id: message.author.id, character: '', name: '', fruit: '', hemisphere: '' } }
					loc = args[1];
					User.hemisphere = 'Southern';
					client.setIsland.run(User);
					return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your Islands Location to your Island Information.`);
				default:
					return client.error(message.channel, 'ERROR', `<@${message.author.id}> Please provide either \`northern\` or \`southern\``);
			}

		// Remove Island
		case 'del':
		case 'delete':
		case 'remove':
			User = client.getIsland.get(message.author.id);
			if (User) {
				UserSQL.prepare("DELETE FROM islands WHERE id = ?;").run(message.author.id);
				return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully deleted your island information! You can set it again by typing \`${client.prefix}is <character|name|fruit|location> <value>\` Example: \`${client.prefix}is fruit peach\``);
			}
			return client.error(message.channel, 'ERROR', `<@${message.author.id}> You do not have a island setup. You can set it by typing \`${client.prefix}is <character|name|fruit|location> <value>\` Example: \`${client.prefix}is fruit peach\``);

		// Display User Friendcode
		default:
			if (args.length === 0) {
				UserFC = client.getFC.get(message.author.id);
				UserIS = client.getIsland.get(message.author.id);
				if (!UserIS) {
					return client.error(message.channel, 'ERROR', `<@${message.author.id}> You do not have a island setup! You can do so by running \`${client.prefix}is <character|name|fruit|location> <value>\` Example: \`${client.prefix}is fruit peach\``);
				}
				output = '';
				if (UserFC) { output += `Friend Code: **${UserFC.code}**\n` };
				if (UserIS.character != null) { output += `Characters Name: **${UserIS.character}**\n` };
				if (UserIS.name != null) { output += `Island Name: **${UserIS.name}**\n` };
				if (UserIS.hemisphere != null) { output += `Hemisphere: **${UserIS.hemisphere}**\n` };
				if (UserIS.fruit != null) { output += `Fruit: ${client.emoji[UserIS.fruit]} **${UserIS.fruit}**\n\n` };
				embed = new Discord.MessageEmbed()
					.setAuthor(`${message.member.displayName}'s Island`, message.author.displayAvatarURL())
					.setColor(client.getRandomColor())
					.setDescription(output);
				if (UserIS.hemisphere != null) { embed.setThumbnail(`https://pnkllr.net/projects/Blathers/${UserIS.hemisphere}.png`) };
				if (UserIS.turnip_price != null) {
					today = new Date();
					posted = new Date(UserIS.dodo_time);

					if ((today.getTime() - posted.getTime()) < 3600000) {
						embed.addField(`Turnip Price`, `${UserIS.turnip_price} ${client.emoji.bells}`, true);
						embed.addField(`DODO Code`, `${UserIS.dodo_code}`, true);
					}
				}
				return message.channel.send(embed);
			}

			// See Tagged Users Friendcode
			member = message.mentions.members.first();
			if (member) {
				UserFC = client.getFC.get(message.mentions.members.first().id);
				UserIS = client.getIsland.get(message.mentions.members.first().id);
				if (!UserIS) {
					return client.error(message.channel, 'ERROR', `${member.displayName} has not set their island!`);
				}
				output = '';
				if (UserFC) { output += `Friend Code: **${UserFC.code}**\n` };
				if (UserIS.character != null) { output += `Characters Name: **${UserIS.character}**\n` };
				if (UserIS.name != null) { output += `Island Name: **${UserIS.name}**\n` };
				if (UserIS.hemisphere != null) { output += `Hemisphere: **${UserIS.hemisphere}\n**` };
				if (UserIS.fruit != null) { output += `Fruit: ${client.emoji[UserIS.fruit]} **${UserIS.fruit}**` };
				embed = new Discord.MessageEmbed()
					.setAuthor(`${member.displayName}'s Island`, member.user.displayAvatarURL())
					.setColor(client.getRandomColor())
					.setDescription(output)
				if (UserIS.hemisphere != null) { embed.setThumbnail(`https://pnkllr.net/projects/Blathers/${UserIS.hemisphere}.png`) };
				if (UserIS.turnip_price != null) {
					today = new Date();
					posted = new Date(UserIS.dodo_time);

					if ((today.getTime() - posted.getTime()) < 3600000) {
						embed.addField(`Turnip Price`, `${UserIS.turnip_price} ${client.emoji.bells}`, true);
						embed.addField(`DODO Code`, `${UserIS.dodo_code}`, true);
					}
				}
				return message.channel.send(embed);
			}
			return client.error(message.channel, 'ERROR', `Could not find a member by that name!`);
	}

};

module.exports.conf = {
	enabled: true,
	aliases: ['is'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'island',
	category: 'misc',
	description: 'Displays your Island Information',
	usage: `island <character|name|fruit|location> <value>\nExample: is fruit peach`,
	details: '<character|name|fruit|location> => Update the information of the seclected area.'
};