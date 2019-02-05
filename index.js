const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!message.guild) return;

  if (message.content === '/join') {
    
   // Only try to join the sender's voice channel if they are in one themselves
   if (message.member.voiceChannel) {
     message.member.voiceChannel.join()
       .then(connection => { // Connection is an instance of VoiceConnection
         message.reply('I have successfully connected to the channel!');
         const receiver = connection.createReceiver();
       })
       .catch(console.log);
   } else {
     message.reply('You need to join a voice channel first!');
   }
 }

});

client.login(process.env.KARAOKE_TOKEN);
