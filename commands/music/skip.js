exports.run = (client, message, args) => {
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	var mcheck = true;

	if (!player || !player.queue[0]) return client.error(message.channel, 'No Playlist Playing', `Use \`;play\` to beguin selection.`);
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
