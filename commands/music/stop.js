exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);
	
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player) return;
	if (!voiceChannel) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);
	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	client.music.players.destroy(message.guild.id); //bot go bye bye
	message.channel.send(`⏹️ **STOPPED**\nThanks for listening!`);
};

module.exports.conf = {
	enabled: true,
	aliases: ['leave'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'stop',
	category: 'music',
	description: 'Stops playing music and leaves the VC',
	usage: 'stop'
};
