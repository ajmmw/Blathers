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
			let score;
			score = client.getScore.get(message.author.id, message.guild.id);
			if (!score) {
				score = {
					id: `${message.guild.id}-${message.author.id}`,
					user: message.author.id,
					guild: message.guild.id,
					name: message.author.username,
					points: 0,
					level: 1
				};
			}

			const random = Math.floor(Math.random() * choices.length);
			const final = choices[random];
			resultStr = `<@${message.author.id}> threw \`${args[0]}\` while I threw \`${final.choice}\`!`;

			if (args[0] === final.choice) {
				return message.channel.send(`➖ **TIE**\n<@${message.author.id}> and I both threw \`${final.choice}\` and tied!`);
			} else if (args[0] !== final.beats) {
				score.points += 10;
				client.success(message.channel, 'YOU WON', `${resultStr}\n\`+10 Bells\``);
				return client.setScore.run(score);
			} else {
				if (score.points > 10) {
				score.points -= 10;
				resultStr += `\n\`-10 Bells\``
				}
				client.error(message.channel, 'YOU LOST', `${resultStr}`);
				return client.setScore.run(score);
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