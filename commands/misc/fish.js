exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  if (args.length === 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Fish Name.`);
  }
  value = args.slice(0).join(' ');
  if (value.length < 3) return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a longer name to search.`);
  Fish = client.getFish.get(value);
  if (!Fish) {
    Fish = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
    let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
    for (const data of Fish) {
      output += `${data.name.toProperCase()} :: ${data.species}\n`;
    }
    if (Fish == 0) output += `Nothing found :: Try again`;
    return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(`${Fish.name.toProperCase()}`, null)
    .setDescription(`\`\`\`${Fish.quote}\`\`\``)
    .addField(`Price`, `${Fish.price.toLocaleString()} ${client.emoji.bells}`, true)
    .addField(`Shadow Size`, `${Fish.size}`, true)
    .addField(`Time of Day`, `${Fish.time}`, true)
    .addField(`Location`, `${Fish.location}`, true)
    .addField(`Rarity`, `${Fish.rarity}`, true)
    .addField(`Available (Northern Hemisphere)`, `${Fish.nh}`, false)
    .addField(`Available (Southern Hemisphere)`, `${Fish.sh}`, false)
    .setThumbnail(Fish.image)
    .setFooter(`Info from Fandom WIKI | ${client.prefix}invite to add Blathers to your server`, null)
    .setColor(client.getRandomColor());
  return message.channel.send(embed);

};

module.exports.conf = {
  enabled: true,
  aliases: ['f'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'fish',
  category: 'misc',
  description: 'Lookup a certain fish from the Museum',
  usage: 'fish <name>',
  details: '<name> => The name of the fish required to lookup.'
};