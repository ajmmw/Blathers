const { Utils } = require('erela.js');

exports.run = (client, message, args) => {
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player || !player.queue[0]) return client.error(message.channel, 'No Playlist Playing', `Use \`;play\` to beguin selection.`);
	const { title, author, duration, uri, thumbnail } = player.queue[0];

	if (voiceChannel.id !== player.voiceChannel.id) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	return message.channel.send(`▶️ **Currently Playing**\n\`${title} (${Utils.formatTime(duration, true)})\` by \`${author}\``);
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