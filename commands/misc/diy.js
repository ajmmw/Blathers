exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

	// DIY Looku
	if (args.length === 0) {
		return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide the name of the item you wish to lookup.`);
	}
	value = args.join(' ');
	if (value.length < 4) return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a longer name to search.`);
	Item = client.getDIY.get(value);
	if (!Item) {
		Item = DataSQL.prepare("SELECT * FROM diy WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
		let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
		for (const data of Item) {
			output += `${data.name.toProperCase()} :: ${data.category}\n`;
		}
		if (Item == 0) 	output += `Nothing found :: Try again`;
		return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
	}
	embed = new Discord.MessageEmbed()
		.setAuthor(`${Item.name.toProperCase()}`, null)
		.addField(`Size`, Item.sizeLink, true)
		.addField(`Price`, `${Item.price.toLocaleString()} ${client.emoji.bells}`, true)
		.addField(`Obtained`, Item.obtainedFrom, true)
		.addField(`Category`, Item.category, true)
		.addField(`Materials`, Item.materials)
		.setThumbnail(Item.image)
		.setColor(client.getRandomColor());
	return message.channel.send(embed);
}

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'diy',
	category: 'misc',
	description: 'Lookup a certain recipe of all craftable items.',
	usage: 'diy <name>',
	details: '<name> => The name of the diy recipe you wish to lookup.'
};