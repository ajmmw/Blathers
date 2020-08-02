exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);

  let score;
  score = client.getScore.get(message.author.id, message.guild.id);
  if (!score) {
    score = {
      id: `${message.guild.id}-${message.author.id}`,
      user: message.author.id,
      guild: message.guild.id,
      name: message.author.username,
      points: 0,
      level: 1
    };
  }

  const bet = parseInt(args[0], 10);

  if (!bet) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide the amount of bells you wish to gamble`);
  }

  if (bet > score.points || bet < 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please check your Bells balance and try again`);
  }

  let reel = [
    '<:pear:706420665493749807>',
    '<:peach:706420967831765073>',
    '<:orange:706420858490585089>',
    '<:coconut:706421507479306301>',
    '<:apple:706420582383747114>',
    '<:cherry:706420773346213889>',
    '<:bells:706446973711941653>',
    '<:wasp_nest:706446781378068520>',
  ];

  winMsg = [
    'Congratulations!',
    'On a scale of 1 to 10, this was 2 easy',
    'Aw, yeah!',
    'You got lucky.',
    'GOOOOOOOAAAAAL!!',
    'Keep it up!',
    'Baby, now you\'re number one, shining bright for everyone!',
    'I only let you win out of pity.',
    'Dreams do come true!',
    'The way to success is always difficult, but you still manage to get yourself on top and be honored.',
    'You rarely win, but sometimes you do.',
    'Sometimes in life you don\'t always feel like a winner, but that doesn\'t mean you\'re not a winner.',
    'It\'s easy to win. Anybody can win.',
    'Winning is great, sure, but if you are really going to do something in life, the secret is learning how to lose.',
    'A winner is just a loser who tried one more time.',
    'This thing must have been rigged!',
    '?!......... (Seriously?!)'
  ];
  winRnd = Math.floor(Math.random() * winMsg.length);

  loseMsg = [
    'Better luck next time!',
    'Gambling can be hard, but don\'t stray.',
    `Dreamin\', don\'t give it up <@${message.author.id}>`,
    'Can you like.. win? please?',
    'Game Over.',
    'Don\'t looooose your waaaaaaay!',
    'You just weren\'t good enough.',
    `Will <@${message.author.id}> finally win? Find out next time on Dragon Ball Z!`,
    `<@${message.author.id}> has lost something great today!`,
    'Perhaps if you trained in the mountains in solitude, you could learn how to win.',
    'Believe in the heart of the cards!',
    'Believe in me who believes in you!',
    '404 Win Not Found.',
    'If the human body is 65% water, how can you be 100% salt?',
    'To win you must gain sight beyond sight!',
    'You\'re great at losing! Don\'t let anyone tell you otherwise.',
    'So tell me, what\'s it like living in a constant haze of losses?',
    'Did you know that games of chance is the same way how Quantum Mechanics work?',
    'L-O-S-E-R...',
    'Dreams shattered :(',
    'You\'re not obligated to win. You\'re obligated to keep trying.',
    'This is not the end, this is not even the beginning of the end, this is just perhaps the end of the beginning.',
    'Sometimes not getting what you want is a brilliant stroke of luck.',
    'Winning takes talent, to repeat takes character.',
    'Snake? Snake?! Snaaaaaaaaaake!!.',
    'Shut down!',
    'Too bad. Game over. Insert new quarter.',
    'What a joke!',
    'Learn from your defeat, child.',
    'You do not have enough experience! Are you listening to me?!',
    'Hope you\'re listening. Level up!',
    'Your technique need work.',
    'Hey, did you hurt yourself?',
    'That\'s your best?',
    'Hah ha ha ha ha ha ha!',
    'Don\'t make excuses for your loss! Go train and try again!',
    'I won\'t say you\'re bad. I\'ll just think it, OK?',
    'Hey! Don\'t worry about it! You know... being bad and all!',
    'Hm! You should go back to playing puzzle games!',
    'Remember that one time during the game when it looked like you might actually win? No? Me neither.',
    'Is that all you can do? You wouldn\'t have gone very far with that anyway.',
    'A loser doesn\'t know what he\'ll do if he loses, but talks about what he\'ll do if he wins, and a winner doesn\'t talk about what he\'ll do if he wins, but knows what he\'ll do if he loses.',
    'If you can\'t win, lose like a champion!',
    'Whoever said, "It\'s not whether you win or lose that counts," probably lost.',
    'What went wrong? What didn\'t? - it was just one of those days. Not your day really'
  ];
  loseRnd = Math.floor(Math.random() * loseMsg.length);

  let reels = [];
  for (let i = 0; i < 3; i++) {
    reels.push(reel[Math.floor(Math.random() * reel.length)]);
  }

  let result = `${loseMsg[loseRnd]}\n\`-${bet} Bells\``;
  let win = false;
  if (reels[0] === '<:bells:706446973711941653>' || reels[1] === '<:bells:706446973711941653>' || reels[2] === '<:bells:706446973711941653>') {
    winnings = (bet * 2) - bet;
    win = true;
    result = `${winMsg[winRnd]}\n\`+${winnings} Bells\``;
  }
  if (reels[0] === '<:bells:706446973711941653>' && reels[1] === '<:bells:706446973711941653>' || reels[1] === '<:bells:706446973711941653>' && reels[2] === '<:bells:706446973711941653>') {
    winnings = (bet * 5) - bet;
    win = true;
    result = `${winMsg[winRnd]}\n\`+${winnings} Bells\``;
  }
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    win = true;
    winnings = (bet * 10) - bet;
    if (reels[0] === '<:wasp_nest:706446781378068520>') { winnings = (bet * 80) - bet; }
    if (reels[0] === '<:bells:706446973711941653>') { winnings = (bet * 100) - bet; }
    result = `${winMsg[winRnd]}\n\`+${winnings} Bells\``;
  }

  if (win === false) {
    score.points = score.points - bet;
    if (score.points < 0) {
      score.points = 0;
    }
  } else
    score.points = score.points + winnings;

  message.channel.send(`🎰 **[${reels.join('')}]** ${result}`);
  return client.setScore.run(score);
};

module.exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'slots',
  category: 'fun',
  description: 'Try your luck at the slots',
  usage: 'slots',
  details: []
};