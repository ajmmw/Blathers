exports.run = (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'Wrong Channel', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);
	
	fetch(`https://api.giphy.com/v1/gifs/random?api_key=${client.config.giphyAPI}&tag=animalcrossing&rating=PG-13`)
		.then(res => res.json()).then(body => {
			embed = new Discord.MessageEmbed()
				.setImage(body.data.image_original_url)
				.setColor(client.getRandomColor())
				.setFooter(`Powered by GIPHY`, `https://developers.giphy.com/static/img/favicon.22918c3c9ee5.png`);
			return message.channel.send(embed);
		})
};

module.exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'gif',
	category: 'fun',
	description: 'Displays a random Animal Crossing GIF',
	usage: 'gif'
};