exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);
	
	const choices = [
		{
			choice: 'rock',
			beats: 'scissors',
		},
		{
			choice: 'scissors',
			beats: 'paper',
		},
		{
			choice: 'paper',
			beats: 'rock',
		},
	];
	switch (args[0]) {
		case 'rock':
		case 'paper':
		case 'scissors':

			const random = Math.floor(Math.random() * choices.length);
			const final = choices[random];
			const resultStr = `<@${message.author.id}> threw \`${args[0]}\` while I threw \`${final.choice}\`!`;

			if (args[0] === final.choice) {
				return message.channel.send(`➖ **TIE**\n<@${message.author.id}> and I both threw \`${final.choice}\` and tied!`);
			} else if (args[0] !== final.beats) {
				return client.success(message.channel, 'YOU WON', resultStr);
			} else {
				return client.error(message.channel, 'YOU LOST', resultStr);
			}

		default:
			return client.error(message.channel, 'ERROR', `<@${message.author.id}> please pick either \`rock | paper | scissors\``);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'rps',
	category: 'fun',
	description: 'Plays rock paper scissors',
	usage: 'rps <rock|paper|scissors>',
	details: '<rock|paper|scissors> => Rock beats Scissors, Scissors beats Paper, Paper beats Rock.'
};