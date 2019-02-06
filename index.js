const Discord = require('discord.js')
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.guild) return;

  var tokenized = message.content.split(" ");
  var command = tokenized[0];
  var url = tokenized[1];

  if (tokenized[0] === '/karaoke') {
   // Only try to join the sender's voice channel if they are in one themselves
   if (message.member.voiceChannel) {
     message.member.voiceChannel.join()
       .then(connection => { // Connection is an instance of VoiceConnection
         message.reply('now playing requested song.');
         const receiver = connection.createReceiver();
         const stream = ytdl(url, { filter : 'audioonly' });
         const dispatcher = connection.playStream(stream);
       })
       .catch(console.log);
       } else {
     message.reply('You need to join a voice channel first!');
   }
 }

});

client.login(process.env.KARAOKE_TOKEN);
