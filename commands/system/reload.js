module.exports.run = (client, message, args, level) => {
	const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

	if (!command) {
		return client.error(message.channel, 'INVALID', "That's not a valid command!");
	}

	const props = require(`../../commands/${command.help.category}/${command.help.name}`);

	try {
		delete require.cache[require.resolve(`../../commands/${command.help.category}/${command.help.name}.js`)];
		client.commands.set(command.help.name, props);

		console.log(`${command.help.name} command was reloaded!`);
		return client.success(message.channel, 'SUCCESS', `Successfully reloaded command \`${command.help.name}\`!`);
	} catch (e) {
		return message.reply(`Error reladoing \`${command}.js\` : \`${e}\``);
	}
};

module.exports.conf = {
	guildOnly: false,
	aliases: [],
	permLevel: 'Bot Owner'
};

module.exports.help = {
	name: 'reload',
	category: 'system',
	description: 'Deletes the cache and reloads the specified command',
	usage: 'reload <command name>',
	details: '<command name> => Any valid command name'
};
