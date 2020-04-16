exports.run = (client, message, args) => {
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=${client.config.giphyAPI}&tag=animalcrossing`)
    .then(res => res.json()).then(body => {
      embed = new Discord.MessageEmbed()
        .setImage(body.data.image_original_url)
        .setColor(client.getRandomColor());
      return message.channel.send(embed).catch(error => { console.error('GIF COMMANMD', error); });
    })
};

module.exports.help = {
  name: 'gif',
  category: 'fun',
  description: 'Displays a random Animal Crossing GIF',
  usage: ';gif',
  aliases: [],
};