//shuffle functions from stackoverflow

mixArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
};

shuffle = ({ array, times }) => {
	return new Promise((resolve, reject) => {
		if (array) {
			for (let t = 0; t < times; t++) {
				let arr = mixArray(array);

				if (t >= times - 1) {
					return resolve(arr);
				}
			}
		}
	});
};

exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'Wrong Channel', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);
	
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player || !player.queue[0]) return client.error(message.channel, 'No Playlist Playing', `Use \`${client.prefix}play\` to beguin selection.`);
	if (!voiceChannel) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);
	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	try {
		if (player.queue.length > 2) {
			shuffle({ array: player.queue, times: 5 }).then((queue) => {
				player.queue = queue; //shuffle ittttt
			});
			return message.channel.send(`🔀 **SHUFFLE ACTIVE**\nPlaylist now shuffled.`);
		} else {
			client.error(message.channel, 'Not Enough Songs', `The queue only has one song left in it.`);
		}
	} catch (e) {
		console.error(e);
	}
};

module.exports.conf = {
	enabled: true,
	aliases: ['mix'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'shuffle',
	category: 'music',
	description: 'Shuffles the current soundtrack',
	usage: 'shuffle'
}; 