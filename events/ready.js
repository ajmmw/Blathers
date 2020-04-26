module.exports = (client) => {
  console.log("Museum Open");

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

  const activitiesList = [
    `on ${client.guilds.cache.size} islands`,
    `AC:NH with ${client.users.cache.size} users`,
    `with the developer's console`,
    `with the ;help command`,
    'AC:NH with PnKllr#0001',
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * activitiesList.length);

    // Setting activity
    client.user.setActivity(activitiesList[index]);
  }, 30000);
}