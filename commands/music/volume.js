exports.run = (client, message, args) => {
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player) return;
	if (!voiceChannel) return message.channel.send('You must be in the VC to use this command');
	if (voiceChannel.id !== player.voiceChannel.id)
		return message.channel.send('You must be in the VC to use this command');
	if (!args[0]) return;

	const volume = Number(args[0]); //convert to integer
	if (volume < 1 || volume > 100) {
		return message.reply('Please type a number between 1 and 100');
	}

	try {
		player.setVolume(volume); //set player volume
		let embed = new Discord.MessageEmbed()
			.setTitle('Blathers Music')
			.setDescription(`The volume has been changed to **${volume}**`)
			.setColor(client.getRandomColor());
		return message.channel.send({ embed: embed });
	} catch (e) {
		return console.error(e);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: [ 'vol' ],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'volume',
	category: 'music',
	description: "Changes the bot's volume",
	usage: 'volume'
};
