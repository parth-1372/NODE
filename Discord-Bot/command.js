const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken("MTI2Njk5NTkwMTU4Nzc4Mzc4NA.G9M80J.8BgvX9hrQeZYvnnTHOHsOKBLZltIP7HlycH0yY");

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
         await rest.put(Routes.applicationCommands("1266995901587783784"), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
})();
