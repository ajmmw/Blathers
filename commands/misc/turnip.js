exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  if (args.length < 2 || args.length > 2 || !isFinite(args[0])) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> The format for turnip pricing is \`${client.prefix}turnip <price> <dodo code>\`.`);
  }

  if (args[0] < 9 || args[0] > 660) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> turnip price is either below the min sell price, or above the max.\nDon't be a hacker.`);
  }

  const blocked = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', '\\', '|', ';', ':', '\'', '"', ',', '<', '.', '>', '/', '?', 'I', 'O', 'Z',];
  if (args[1].length != 5 || blocked.indexOf(args[1].toUpperCase()) != -1) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> invalid DODO code.\nPlease check again.`);
  }
  var today = new Date().toLocaleString();
  User = client.getIsland.get(message.author.id);
  if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null, turnip_price: null, dodo_code: null, dodo_time: null } }
  User.turnip_price = args[0];
  User.dodo_code = args[1].toUpperCase();
  User.dodo_time = today;
  client.setIsland.run(User);

  return client.success(message.channel, 'SUCCESS', `<@${message.author.id}> I've successfully added your Turnip Price and Invite Code to your Island Information.\nThis information will reset in an hour.`);
};

module.exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'turnip',
  category: 'misc',
  description: 'Set your current turnip price with DODO invite code',
  usage: `turnip <price> <code>\nExample: turnip 83 DJ6MN`,
  details: '<price> => The current price of your Turnips.\n<code> => Your DODO code.'
};