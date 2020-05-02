const { ErelaClient, Utils } = require('erela.js');
const { nodes } = require('../lavanodes.json');

module.exports = (client) => {
	console.log("Museum Open");

	client.music = new ErelaClient(client, nodes)
		.on('nodeError', console.error)
		.on('nodeConnect', () => console.log('Lavalink node created.'))
		.on('socketClosed', (player) => {
			return client.music.players.destroy(player.guild.id);
		})
		.on('queueEnd', (player) => {
			setTimeout(() => {
				if (player.queue.length == 0) {
					return client.music.players.destroy(player.guild.id);
				} else {
					return;
				}
			}, 240000);
		});

	// Guild Settings
	client.getSetting = UserSQL.prepare("SELECT * FROM guild_settings WHERE id = ?");
	client.setSetting = UserSQL.prepare("INSERT OR REPLACE INTO guild_settings (id, lvl_up, prefix, music_channel, misc_channel, fun_channel) VALUES (@id, @lvl_up, @prefix, @music_channel, @misc_channel, @fun_channel);");
	
	//User Scores
	client.getScore = UserSQL.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	client.setScore = UserSQL.prepare("INSERT OR REPLACE INTO scores (id, user, guild, name, points, level) VALUES (@id, @user, @guild, @name, @points, @level);");

	//User Islands
	client.getIsland = UserSQL.prepare("SELECT * FROM islands WHERE id = ?");
	client.setIsland = UserSQL.prepare("INSERT OR REPLACE INTO islands (id, character, name, fruit, hemisphere) VALUES (@id, @character, @name, @fruit, @hemisphere);");

	//User Friendcode
	client.getFC = UserSQL.prepare("SELECT * FROM friendcode WHERE id = ?");
	client.setFC = UserSQL.prepare("INSERT OR REPLACE INTO friendcode (id, name, code) VALUES (@id, @name, @code);");

	// Lookup
	client.getFish = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ?");
	client.getBug = DataSQL.prepare("SELECT * FROM bug WHERE name LIKE ?");
	client.getFossil = DataSQL.prepare("SELECT * FROM fossil WHERE name LIKE ?");
	client.getVillager = DataSQL.prepare("SELECT * FROM villager WHERE name LIKE ?");

	setInterval(() => {
		activitiesList = [
			`on ${client.guilds.cache.size.toLocaleString()} islands`,
			`AC:NH with ${client.users.cache.size.toLocaleString()} users`,
			`with the developer's console`,
			`with the ;help command`,
			'AC:NH with PnKllr',
		];
		index = Math.floor(Math.random() * activitiesList.length);

		// Setting activity
		client.user.setActivity(activitiesList[index]);
	}, 30000);
}
