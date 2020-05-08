exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);
	
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player) return;
	if (!voiceChannel) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);
	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);
	if (!args[0]) return;

	const volume = Number(args[0]); //convert to integer
	if (volume < 1 || volume > 100 || !isFinite(args[0])) {
		return message.reply('Please type a number between 1 and 100');
	}

	try {
		bar = Math.ceil(volume / 100 * 10);
		player.setVolume(volume); //set player volume
		let embed = new Discord.MessageEmbed()
			.setTitle('-● DJ Blathers ●-')
			.setDescription(`${'▓'.repeat(bar)}${'░'.repeat(10 - bar)} **VOLUME ${volume}%**`)
			.setColor(client.getRandomColor());
		return message.channel.send({ embed: embed });
	} catch (e) {
		return console.error(e);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: ['vol'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'volume',
	category: 'music',
	description: "Changes the bot's volume",
	usage: 'volume'
};
