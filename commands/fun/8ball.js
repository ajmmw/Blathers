exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);
	
	if (args.length === 0) {
		return client.error(message.channel, 'ERROR', `<@${message.author.id}> what was your question?`);
	}
	const resp = ['It is certain', 'It is decidedly so', 'Replay hazy... Try again', 'Cannot predict now', "Don't count on it", 'Outlook not so good', 'My sources say no', 'Signs point to yes', 'As I see it, yes', 'Ask again later', 'Better not tell you now', 'Concentrate and ask again', 'Don’t count on it', 'Most likely', 'My reply is no', 'Outlook good', 'Very doubtful', 'Without a doubt', 'Yes', 'Yes – definitely'];
	const random = Math.floor(Math.random() * resp.length);
	return message.channel.send(`${client.emoji['8ball']} | ${resp[random]}, **${message.member.displayName}**`);
};

module.exports.conf = {
	enabled: true,
	aliases: ['8', 'predict'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: '8ball',
	category: 'fun',
	description: 'Provides random responses to an asked Yes-or-No question',
	usage: '8 <question>',
	details: '<question> => Any Yes-or-No question will suffice'
};