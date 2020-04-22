const fs = require('fs');

exports.run = (client, message, args) => {
	let rawdata = fs.readFileSync('package.json');
	let obj = JSON.parse(rawdata);

	function uptime(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
		const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
		return `${days.padStart(1, '0')} days ${hrs.padStart(2, '0')} hours ${min.padStart(2, '0')} minutes`;
	}
	const embed = new Discord.MessageEmbed()
		.addField(`Version`, `${obj.version}`, true)
		.addField(`Library`, `[discord.js](https://discord.js.org/#/)`, true)
		.addField(`Node JS`, `${process.version}`, true)
		.addField(`Servers`, `${client.guilds.cache.size}`, true)
		.addField(`Users`, `${client.users.cache.size}`, true)
		.addField(
			`Invite`,
			`[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=598007871720128544&permissions=387072&scope=bot)`,
			true
		)
		.addField(`Discord`, `[Support Discord](https://discord.gg/z6uApMZ)`, true)
		.addField(`Developer`, `PnKllr`, true)
		.setFooter(`Uptime ${uptime(client.uptime)}`)
		.setColor(0xff0092);
	return message.channel.send(embed);
};

module.exports.conf = {
	enabled: true,
	aliases: [ 'ver' ],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
    name: 'info',
    category: 'system',
    description: 'Shows information about the bot.',
    usage: 'info'
};
