exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  // DIY Looku
  if (args.length === 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide the name of the villager you wish to lookup.`);
  }
  value = args.join(' ');
  if (value.length < 2) return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a longer name to search.`);
  Villager = client.getVillager.get(value);
  if (!Villager) {
    Villager = DataSQL.prepare("SELECT * FROM villager WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
    let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
    for (const data of Villager) {
      output += `${data.name.toProperCase()} :: ${data.species}\n`;
    }
    if (Villager == 0) output += `Nothing found :: Try again`;
    return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(`${Villager.name.toProperCase()}`, null)
    .addField(`Gender`, Villager.gender, true)
    .addField(`Personality`, Villager.personality, true)
    .addField(`Species`, Villager.species, true)
    .addField(`Birthday`, Villager.birthday, true)
    .addField(`Sign`, Villager.sign, true)
    .addField(`Phrase`, Villager.phrase, true)
    .setThumbnail(Villager.portrait)
    .setImage(Villager.image)
    .setFooter(`Info from Fandom WIKI | ;invite to add Blathers to your server`, null)
    .setColor(client.getRandomColor());
  return message.channel.send(embed);
}

module.exports.conf = {
  enabled: true,
  aliases: ['vil'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'villager',
  category: 'misc',
  description: 'Lookup information about a particular villager.',
  usage: 'vil <name>',
  details: '<name> => The name of the villager you wish to lookup.'
};