exports.run = async (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.fun_channel) && message.channel.id != Settings.fun_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.fun_channel)}.`);

	if (!sentTrivia.has(message.guild.id)) {
		embed = new Discord.MessageEmbed()
			.setTitle(`Generating`)
			.setColor(0xFFA21C);
		let question = await message.channel.send(embed)
		fetch("https://opentdb.com/api.php?amount=1&encode=base64")
			.then(res => res.json()).then(body => {
				sentTrivia.add(message.guild.id);
				embed = new Discord.MessageEmbed()
					.setTitle(`${Buffer.from(body.results[0].category, 'base64').toString()} - ${Buffer.from(body.results[0].difficulty, 'base64').toString().toUpperCase()}`)
					.setDescription(`**${Buffer.from(body.results[0].question, 'base64').toString()}**\n\nChoose from the below options.`)
					.setColor(0xFFA21C);

				options = [];
				for (var i = 0; i < Object.keys(body.results[0].incorrect_answers).length; ++i) {
					options.push(`${Buffer.from(body.results[0].incorrect_answers[i], 'base64').toString()}`);
				}
				options.push(`${Buffer.from(body.results[0].correct_answer, 'base64').toString()}`);

				function shuffle(array) {
					var currentIndex = array.length, temporaryValue, randomIndex;
					while (0 !== currentIndex) {
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;
						temporaryValue = array[currentIndex];
						array[currentIndex] = array[randomIndex];
						array[randomIndex] = temporaryValue;
					}

					return array;
				}
				options = shuffle(options);
				for (var i = 0; i < Object.keys(options).length; ++i) {
					embed.addField(`Answer ${[i + 1]}`, `${options[i]}`, true);
				}

				question.edit(embed).catch(err => { return; })
					.then(() => {
						client.channels.cache.get(message.channel.id).awaitMessages(response => response.content.toLowerCase() == Buffer.from(body.results[0].correct_answer, 'base64').toString().toLowerCase(), {
							max: 1,
							time: 30000,
							errors: ['time'],
						})
							.then((collected) => {
								sentTrivia.delete(message.guild.id);
								embed = new Discord.MessageEmbed()
									.setTitle(`${Buffer.from(body.results[0].category, 'base64').toString()} - ${Buffer.from(body.results[0].difficulty, 'base64').toString().toUpperCase()}`)
									.setDescription(`${Buffer.from(body.results[0].question, 'base64').toString()}`)
									.setThumbnail(collected.first().author.avatarURL())
									.addField("Guesser:", collected.first().author.toString())
									.addField("Answer:", Buffer.from(body.results[0].correct_answer, 'base64').toString())
									.setColor(0x01C818);
								question.edit(embed).catch(err => { return; });
								if (Buffer.from(body.results[0].difficulty, 'base64').toString().toUpperCase() == 'EASY') {
									points = 10;
								} else if (Buffer.from(body.results[0].difficulty, 'base64').toString().toUpperCase() == 'MEDIUM') {
									points = 25;
								} else {
									points = 50;
								}
								client.channels.cache.get(message.channel.id).send(`Correct ${collected.first().author.toString()}! You scored ${points} ${client.emoji.bells}.`);
								let score;
								score = client.getScore.get(collected.first().author.id, message.guild.id);
								score.points += points;
								const curLevel = Math.floor(0.2 * Math.sqrt(score.points));
								if (score.level < curLevel) {
									score.level++;
									if (Guild_Settings.lvl_up === 'true') {
										embed = new Discord.MessageEmbed()
											.setDescription(`<@${collected.first().author.toString()}>, You've leveled up to level **${curLevel}**! Ain't that dandy? ${client.emoji.leafGlow}`)
											.setColor(getRandomColor());
										message.channel.send(embed);
									}
								}
								return client.setScore.run(score);
							})
							.catch(() => {
								sentTrivia.delete(message.guild.id);
								embed = new Discord.MessageEmbed()
									.setTitle(`${Buffer.from(body.results[0].category, 'base64').toString()} - ${Buffer.from(body.results[0].difficulty, 'base64').toString().toUpperCase()}`)
									.setDescription(`${Buffer.from(body.results[0].question, 'base64').toString()}`)
									.setThumbnail(``)
									.addField("Answer:", Buffer.from(body.results[0].correct_answer, 'base64').toString())
									.setColor(0xE90E0E);
								question.edit(embed).catch(err => { return; });
								return client.channels.cache.get(message.channel.id).send(`No one answered correctly, the answer was ${Buffer.from(body.results[0].correct_answer, 'base64').toString()}.`).catch(error => { return; });
							});
					});
			})
	} else
		client.channels.cache.get(message.channel.id).send(`${client.emoji.warning} **WARNING**\nA question has already been asked.`);
};

module.exports.conf = {
	enabled: false,
	aliases: ['q', 'question'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'trivia',
	category: 'fun',
	description: 'Starts a random Trivia Question',
	usage: 'q'
};