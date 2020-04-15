exports.run = (client, message, args) => {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=${client.config.giphyAPI}&tag=animalcrossing`)
    .then(res => res.json()).then(body => {
      embed = new Discord.MessageEmbed()
        .setImage(body.data.image_original_url)
        .setColor(getRandomColor());
      return message.channel.send(embed).catch(error => { console.error('GIF COMMANMD', error); });
    })
}