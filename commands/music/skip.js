exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'Wrong Channel', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);
	
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	var mcheck = true;

	if (!player || !player.queue[0]) return client.error(message.channel, 'No Playlist Playing', `Use \`${client.prefix}play\` to beguin selection.`);
	if (!voiceChannel) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);
	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	if (player.queue.length == 1) {
		//check if only 1 song is left
		message.channel.send('⏹️ **STOPPED**\nThats the end of the playlist! Thanks for listening.');
		client.music.players.destroy(message.guild.id); //if there is, bot leaves
		mcheck = false;
	}

	message.channel.send(`⏭️ **SKIPPED**`);
	if (mcheck) player.stop(); //skips current track
};

module.exports.conf = {
	enabled: true,
	aliases: ['vol'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'skip',
	category: 'music',
	description: 'Skips the currently playing track',
	usage: 'skips'
};
