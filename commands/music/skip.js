exports.run = (client, message, args) => {
  const voiceChannel = message.member.voice.channel;
  const player = client.music.players.get(message.guild.id);

  var mcheck = true;

  if (!player || !player.queue[0]) return message.reply("There aren't any tracks currently playing.");
  if (!voiceChannel) return message.channel.send('You must be in the VC to use this command');
  if (voiceChannel.id !== player.voiceChannel.id)
    return message.channel.send('You must be in the VC to use this command');

  if (player.queue.length == 1) {
    //check if only 1 song is left
    bot.music.players.destroy(message.guild.id); //if there is, bot leaves
    mcheck = false;
  }

  message.react('⏭️');
  if (mcheck) player.stop(); //skips current track
};

module.exports.conf = {
  enabled: true,
  aliases: ['vol'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'skip',
  category: 'music',
  description: 'Skips the currently playing track',
  usage: 'skips'
};