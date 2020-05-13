exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  if (args.length === 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Fossil Name.`);
  }
  value = args.slice(0).join(' ');
  if (value.length < 4) return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a longer name to search.`);
  Fossil = client.getFossil.get(value);
  if (!Fossil) {
    Fossil = DataSQL.prepare("SELECT * FROM fossil WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
    let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
    for (const data of Fossil) {
      output += `${data.name.toProperCase()} :: ${data.species}\n`;
    }
    if (Fossil == 0) output += `Nothing found :: Try again`;
    return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(`${Fossil.name.toProperCase()}`, null)
    .setDescription(`\`\`\`${Fossil.quote}\`\`\``)
    .addField(`Price`, `${Fossil.price.toLocaleString()} ${client.emoji.bells}`, true)
    .setThumbnail(Fossil.image)
    .setFooter(`Info from Fandom WIKI | ;invite to add Blathers to your server`, null)
    .setColor(client.getRandomColor());
  return message.channel.send(embed);

};

module.exports.conf = {
  enabled: true,
  aliases: ['fos'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'fossil',
  category: 'misc',
  description: 'Lookup a certain fossil from the Museum',
  usage: 'fos <name>',
  details: '<name> => The name of the fossil required to lookup.'
};