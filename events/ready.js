module.exports = (client) => {
    console.log("Museum Open");
    client.user.setActivity(`on ${client.guilds.cache.size} Islands`, { type: 'PLAYING' });

    //User Scores
    client.getScore = UserSQL.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.setScore = UserSQL.prepare("INSERT OR REPLACE INTO scores (id, user, guild, name, points, level) VALUES (@id, @user, @guild, @name, @points, @level);");

    //User Friendcode
    client.getFC = UserSQL.prepare("SELECT * FROM friendcode WHERE id = ?");
    client.setFC = UserSQL.prepare("INSERT OR REPLACE INTO friendcode (id, name, code) VALUES (@id, @name, @code);");

    // Lookup
    client.getFish = DataSQL.prepare("SELECT * FROM fish WHERE name LIKE ?");
    client.getBug = DataSQL.prepare("SELECT * FROM bug WHERE name LIKE ?");

    setInterval(function () {
        client.user.setActivity(`on ${client.guilds.cache.size} Islands`, { type: 'PLAYING' });
    }, 10 * 60 * 1000);
}