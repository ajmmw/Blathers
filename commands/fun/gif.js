exports.run = (client, message, args) => {
	fetch(`https://api.giphy.com/v1/gifs/random?api_key=${client.config.giphyAPI}&tag=animalcrossing`)
		.then(res => res.json()).then(body => {
			embed = new Discord.MessageEmbed()
				.setImage(body.data.image_original_url)
				.setColor(client.getRandomColor())
				.setFooter(`Powered by GIPHY`, `https://developers.giphy.com/static/img/favicon.22918c3c9ee5.png`);
			return message.channel.send(embed);
		})
};

module.exports.conf = {
	enabled: false,
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