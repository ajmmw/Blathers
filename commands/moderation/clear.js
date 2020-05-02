exports.run = async (client, message, args) => {
	// Gets the delete count
	const deleteCount = parseInt(args[0], 10);

	if (!message.channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'])) return client.error(message.channel, 'Invalid Permissions!', `I currently don't have the \`Manage Messages\` and/or \`Read Message History\``);

	// If delete count is nonexistent, less than 1 or greater than 100, display this
	if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
		return client.error(message.channel, 'Invalid Number of Messages to Purge!', 'Please provide a number **between 1 and 100** for the number of messages to delete!');
	}
	const descision = await client.reactPrompt(message, `Would you like to delete ${deleteCount} messages from <#${message.channel.id}>?`);

	if (descision) {
		return message.channel.bulkDelete(deleteCount)
			.catch((error) => client.error(message.channel, 'Purge Failed!', `Couldn't delete messages because: \`${error}\``));
	}
	return client.error(message.channel, 'Messages Not Purged!', 'The prompt timed out, or you selected no.');

};

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'Mod',
	cooldown: 10
};

module.exports.help = {
	name: 'clear',
	category: 'moderation',
	description: 'Clears set amount of messages',
	usage: 'clear <value>',
	details: '<value> => The amount of messages to clear.'
};
