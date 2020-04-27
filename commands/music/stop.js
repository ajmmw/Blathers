exports.run = (client, message, args) => {
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player) return;
	if (!voiceChannel) return message.channel.send('You must be in the VC to use this command');
	if (voiceChannel.id !== player.voiceChannel.id)
		return message.channel.send('You must be in the VC to use this command');

	client.music.players.destroy(message.guild.id); //bot go bye bye
	message.react('👋');
};

module.exports.conf = {
	enabled: true,
	aliases: [ 'leave' ],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'stop',
	category: 'music',
	description: 'Stops playing music and leaves the VC',
	usage: 'stop'
};
