// Get Discord.js Ready
const { ShardingManager } = require('discord.js');

// Get Config
const config = require('./config');

// Start Sharding
const manager = new ShardingManager('./bot.js', {
  totalShards: 'auto',
  token: config.token
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));