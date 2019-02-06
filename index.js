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

     const vc = message.member.voiceChannel;

     vc.join()
       .then(connection => { // Connection is an instance of VoiceConnection
         message.reply('now playing requested song.');

         map = {};

         const receiver = connection.createReceiver();

         vc.members.forEach(function(guildMember, guildMemberId) {
            if(guildMember.user != client.user){
              console.log(guildMemberId, guildMember.user.username);
              map[guildMember.user] = receiver.createOpusStream(guildMember.user)
            }
         });

         const stream = ytdl(url, { filter : 'audioonly' });

         const dispatcher = connection.playStream(stream).on("end",()=>{
                vc.leave()
          });
       })
       .catch(console.log);

       } else {
         message.reply('You need to join a voice channel first!');
       }
 }

});

client.login(process.env.KARAOKE_TOKEN);
