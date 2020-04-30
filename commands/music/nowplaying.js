const { Utils } = require('erela.js');

exports.run = (client, message, args) => {
	const voiceChannel = message.member.voice.channel;
	const player = client.music.players.get(message.guild.id);

	if (!player || !player.queue[0]) return message.reply("There aren't any tracks currently playing.");
	const { title, author, duration, url, thumbnail } = player.queue[0];

	if (voiceChannel.id !== player.voiceChannel.id)
		return message.channel.send('You must be in the VC to use this command');

	let embed = new Discord.MessageEmbed()
		.setAuthor('Blathers Music', client.user.displayAvatarURL())
		.setDescription(
			`▶️ Currently playing **[${title}](${url}) (${Utils.formatTime(duration, true)})** by **${author}**`
		)
		.setColor(client.getRandomColor());
	return message.channel.send({ embed: embed });
};

module.exports.conf = {
	enabled: true,
	aliases: [ 'np', 'nowplaying', 'playing' ],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'nowplaying',
	category: 'music',
	description: "Displays song that's currently playing.",
	usage: 'nowplaying'
};
