exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);

  fetch(`https://api.adviceslip.com/advice`)
		.then(res => res.json()).then(body => {
			embed = new Discord.MessageEmbed()
				.setImage(body.slip.image_original_url)
			return message.channel.send(`**ADVICE #${body.slip.id}**\n\`${body.slip.advice}\``);
		})
};

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'advice',
	category: 'fun',
	description: 'Displays random advice for the user',
	usage: 'advice'
};