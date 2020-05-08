const { Utils } = require('erela.js');

exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);
	
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player || !player.queue[0]) return client.error(message.channel, 'NOTHING PLAYING', `Use \`${client.prefix}play\` to beguin selection.`);
	const { title, author, duration, uri, thumbnail } = player.queue[0];

	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	return message.channel.send(`▶️ **CURRENTLY PLAYING**\n\`${title} (${Utils.formatTime(duration, true)})\` by \`${author}\``);
};

module.exports.conf = {
	enabled: true,
	aliases: ['np', 'nowplaying', 'playing'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'nowplaying',
	category: 'music',
	description: "Displays song that's currently playing.",
	usage: 'nowplaying'
};