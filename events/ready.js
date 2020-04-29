const { ErelaClient, Utils } = require('erela.js');
const { nodes } = require('../lavanodes.json');

module.exports = (client) => {
  console.log("Museum Open");

  /* - Lavalink // Erela.js Events - */

	client.music = new ErelaClient(client, nodes) //lavalink client creation :)
  .on('nodeError', console.error) // if anything errors, this will log it
  .on('nodeConnect', () => console.log('Lavalink node created.'))
  .on('socketClosed', (player) => {
    //if a connection is abruptly closed (channel deleted, bot kicked, etc.), this will close the connection and prevent un-needed streaming
    return client.music.players.destroy(player.guild.id);
  })
  .on('trackStart', ({ textChannel }, { title, duration, author }) => {
    //track started, we'll create an embed here. title, duration, and author are parameters that can be used if you want for the current track that's playing
  })
  .on('queueEnd', (player) => {
    //queue's up, do we have any more music to play? let's check
    setTimeout(() => {
      //wait 4 minutes to see if anything else starts playing after queue ends
      if (player.queue.length == 0) {
        //check queue length
        return client.music.players.destroy(player.guild.id); //nothing else added, let's dip
      } else {
        return; //more music started playing, let's forget this ever happened
      }
    }, 240000); //4 minutes
  });

  

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

  activitiesList = [
    `on ${client.guilds.cache.size} islands`,
    `AC:NH with ${client.users.cache.size} users`,
    `with the developer's console`,
    `with the ;help command`,
    'AC:NH with PnKllr#0001',
  ];

  setInterval(() => {
    index = Math.floor(Math.random() * activitiesList.length);

    // Setting activity
    client.user.setActivity(activitiesList[index]);
  }, 30000);
}
