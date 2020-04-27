module.exports = (client) => {
  // Clean
  client.clean = async (clientParam, text) => {
    if (text && text.constructor.name === 'Promise') {
      text = await text;
    }
    if (typeof evaled !== 'string') {
      // eslint-disable-next-line global-require
      text = require('util').inspect(text, { depth: 1 });
    }

    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(clientParam.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

    return text;
  };

  // Status Messages
  client.success = (channel, suc, msg) => {
    channel.send(`${client.emoji.success} **${suc}**\n${msg}`);
  };

  client.error = (channel, err, msg) => {
    channel.send(`${client.emoji.error} **${err}**\n${msg}`);
  };

  client.warn = (channel, warn, msg) => {
    channel.send(`${client.emoji.warning} **${warn}**\n${msg}`);
  };

  // Perm Levels
  client.permLevel = (message) => {
    let permName = 'User';
    let permlvl = 0;
    const permOrder = client.config.permLevels.slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentlvl = permOrder.shift();

      if (currentlvl.check(client, message)) {
        permName = currentlvl.name;
        permlvl = currentlvl.level;
        break;
      }
    }
    return [permName, permlvl];
  };

  // Random Color
  client.getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  Object.defineProperty(String.prototype, 'toProperCase', {
    value() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },
  });
};