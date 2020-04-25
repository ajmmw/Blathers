module.exports.run = async (client, message, args) => {
	//Looking into this, not sure how this works, if it works. Since I can't access the bot's server I can't work on a method.
	//However, if this doesn't work, check this out: https://stackoverflow.com/questions/23766259/restart-node-js-server-programmatically
	await message.channel.send('Rebooting bot! Please allow at least 10 seconds for the bot to fully reboot!');
	console.log('Bot rebooting...');
	process.exit(0);
};

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'Bot Owner'
};

module.exports.help = {
	name: 'reboot',
	category: 'system',
	description: 'Reboots the bot',
	usage: 'reboot'
};
