exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

	switch (args[0]) {
		case 'reset':
			if (message.author.id !== message.guild.owner.id) return client.error(message.channel, 'ERROR', `<@${message.author.id}> only the guild owner can reset everyone.`);
			UserSQL.prepare("DELETE FROM scores WHERE guild = ?;").run(message.guild.id);
			return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully reset everyones bells and level.`);	
		// Display Your Bells
		default:
			if (args.length === 0) {
				User = client.getScore.get(message.author.id, message.guild.id);
				if (!User) return;
				return message.channel.send(`**${message.author.username}'s Bell Balance**\nBells: \`${User.points}\` | Level: \`${User.level}\``);
			}

			// See Tagged Users Bells
			member = message.mentions.members.first();
			if (member) {
				User = client.getScore.get(message.mentions.members.first().id, message.guild.id);
				if (!User) {
					return client.error(message.channel, 'ERROR', `<@${message.mentions.members.first().id}> has yet to be active in the server.`);
				}
				return message.channel.send(`**${member.username}'s Bell Balance**\nBells: \`${User.points}\` | Level: \`${User.level}\``);
			}
			return client.error(message.channel, 'ERROR', `Could not find a member by that name!`);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: ['bal'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'bells',
	category: 'misc',
	description: 'Shows your current Level and Bells on the current server',
	usage: 'bells <@user>',
	details: "<@user> => Only necessary if you're getting the bell amount of another member."
};