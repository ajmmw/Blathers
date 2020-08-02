const fs = require('fs');
const { Utils } = require("erela.js");

exports.run = (client, message, args) => {
	let rawdata = fs.readFileSync('package.json');
	let obj = JSON.parse(rawdata);

	function uptime(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
		const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
		return `${days.padStart(1, '0')}:${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
	}

	const promises = [
		client.shard.fetchClientValues('users.cache.size'),
		client.shard.fetchClientValues('guilds.cache.size'),
		client.shard.fetchClientValues('channels.cache.size'),
		client.shard.fetchClientValues('emojis.cache.size'),
	];

	Promise.all(promises)
		.then(results => {
			const totalUsers = results[0].reduce((prev, userCount) => prev + userCount, 0);
			const totalGuilds = results[1].reduce((prev, guildCount) => prev + guildCount, 0);
			const totalChannels = results[2].reduce((prev, channelCount) => prev + channelCount, 0);
			const totalEmojis = results[3].reduce((prev, emojiCount) => prev + emojiCount, 0);

			const embed = new Discord.MessageEmbed()
				.setAuthor(client.user.username)
				.setThumbnail(client.user.displayAvatarURL())
				.addField(`Versions`, `\`\`\`js\nBlathers: ${obj.version}\nDiscord.js: ${Discord.version}\nNode.js: ${process.versions.node}\`\`\``)
				.addField(`Shard Info`, `\`\`\`js\nShard ID: ${client.guilds.cache.first().shardID}\nUptime: ${uptime(client.uptime)}\nUsers: ${client.users.cache.size.toLocaleString()}\nGuilds: ${client.guilds.cache.size.toLocaleString()}\nChannels: ${client.channels.cache.size.toLocaleString()}\nEmojis: ${client.emojis.cache.size.toLocaleString()}\`\`\``)
				.addField(`Bot Info`, `\`\`\`js\nShard Count: ${client.shard.count.toLocaleString()}\nUsers: ${totalUsers.toLocaleString()}\nGuilds: ${totalGuilds.toLocaleString()}\nChannels: ${totalChannels.toLocaleString()}\nEmojis: ${totalEmojis.toLocaleString()}\`\`\``)
				.addField(`Links`, `[Invite](https://discordapp.com/api/oauth2/authorize?client_id=598007871720128544&permissions=3533894&scope=bot) | [Vote](https://top.gg/bot/598007871720128544/vote) | [Support Server](https://discord.gg/z6uApMZ) | [Patreon](https://patreon.com/blathers)`)
				.setFooter(`Uptime ${uptime(client.uptime)}`, client.user.displayAvatarURL())
				.setFooter(`${client.prefix}invite to add Blathers to your server`, client.user.displayAvatarURL())
				.setColor(0xff0092);
			return message.channel.send(embed);
		})
		.catch((e) =>
			console.log(`[Shard ${client.guilds.cache.first().shardID}] ${e}`)
		);
};

module.exports.conf = {
	enabled: true,
	aliases: ['ver'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'info',
	category: 'system',
	description: 'Shows information about the bot.',
	usage: 'info'
};
