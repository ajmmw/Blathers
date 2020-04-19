const config = {
  token: 'Njk3MDM3OTIyNzI1MjY1NTA4.XpL28Q.5OP6QnqnZIcA3BXPBJQHAgjpUOU',
  prefix: ';',
  
  // API Lists
  dbl: {
    auth: 'ProfOak5000webhook',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ODAwNzg3MTcyMDEyODU0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTYzNzYxNTc4fQ.a_rqF-uQqkLTYjHVQPtOCUDS-NpJXuOww60S9B_BFJw'
  },
  giphyAPI: "ZD6DSPZaxZ4lmEJIOBrtChEs22QSJDzi",

  // Bot Perms and Stuff
  ownerID: '147866541088571393',
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => true,
    },
    {
      level: 10,
      name: 'Bot Owner',
      check: (client, message) => config.ownerID === message.author.id,
    }
  ]
};

module.exports = config;