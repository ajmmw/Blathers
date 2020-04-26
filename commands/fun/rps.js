exports.run = (client, message, args) => {
  const choices = [
    {
      choice: 'rock',
      beats: 'scissors',
    },
    {
      choice: 'scissors',
      beats: 'paper',
    },
    {
      choice: 'paper',
      beats: 'rock',
    },
  ];
  switch (args[0]) {
    case 'rock':
    case 'paper':
    case 'sissors':
    
      const random = Math.floor(Math.random() * choices.length);
      const final = choices[random];
      const resultStr = `You threw \`${args[0]}\` while your opponent threw \`${final.choice}\`!`;
    
      if (args[0] === final.choice) {
        return message.channel.send(`➖ **Tie!**\nYou both threw \`${final.choice}\` and tied!`);
      } else if (args[0] !== final.beats) {
        return client.success(message.channel, 'You Won!', resultStr);
      } else {
        return client.error(message.channel, 'You Lost!', resultStr);
      }

    default:
      return client.error(message.channel, 'No Choice Given', `<@${message.author.id}> please pick either \`rock | paper | sissors\``);
  }
};

module.exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'rps',
  category: 'fun',
  description: 'Plays rock paper scissors',
  usage: 'rps <rock|paper|scissors>',
  details: '<rock|paper|scissors> => Rock beats Scissors, Scissors beats Paper, Paper beats Rock.'
};