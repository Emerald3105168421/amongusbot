const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

bot_secret_token = "TOKENGOESHERE"

client.login(bot_secret_token)

client.on('message', async function (message) {
    console.log(`${JSON.stringify(message)}`)
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let arguments = message.content.slice(1).trim().split(' ');
        let cmd = args[0];
        let sender = message.author
        let sendChannel = message.channel.id
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                if(sendChannel === '#bot-commands channel ID') {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: ":ping_pong: Pong!",
                            value: "My Ping: " + Math.round(client.ws.ping) + ' ms\nYour Ping: ' + (new Date().getTime() - message.createdTimestamp) + ' ms'
                        }],
                    }})
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use #bot-commands to run this command.'
                        }],
                    }})
                }
            break;

            case 'help':
                if(sendChannel === '#bot-commands channel ID') {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Command List",
                            value: '!help > List of commands\n!ping > Returns latency\n!startgame (channel)> Starts a game in (channel)\n!muteall > Mutes all users in your voice chat\n!unmuteall > Unmutes all users in your voice chat\n!gameopen (channel) (number) > Announces that you have (number) slots open in (game)\n!gamefull (channel) > Announces that the game in (channel) is full'
                        }],
                    }})
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use #bot-commands to run this command.'
                        }],
                    }})
                }
                
            break;

            case 'startgame':
                if(sendChannel === '#bot-commands channel ID') {
                    if (arguments[1] != undefined) {
                        let gameChannel = arguments.slice(1,2)
                    message.channel.send('<@' + sender + '> has started a game in ' + gameChannel + '! <@&ping role ID>');
                    } else {
                        message.reply('too few arguments. Use !help to see proper command usage.')
                    }
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use #matchmaking to run this command.'
                        }],
                    }})
                }
            break;

            case 'muteall':
                if(sendChannel === '#bot-commands channel ID' || sendChannel === '#game-1 channel ID' || sendChannel === '#game-2 channel ID') {
                    if (message.member.voice.channel) {
                        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                        for (const [memberID, member] of channel.members) {
                          member.voice.setMute(true);
                        }
                      } else {
                        message.reply('You need to join a voice channel first!');
                      }
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use one of the game channels to run this command.'
                        }],
                    }})
                }
            break;

            case 'unmuteall':
                if(sendChannel === '#bot-commands channel ID' || sendChannel === '#game-1 channel ID' || sendChannel === '#game-2 channel ID') {
                    if (message.member.voice.channel) {
                        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                        for (const [memberID, member] of channel.members) {
                          member.voice.setMute(false);
                        }
                      } else {
                        message.reply('You need to join a voice channel first!');
                      }
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use one of the game channels to run this command.'
                        }],
                    }})
                }
            break;

            case 'gameopen':
                if(sendChannel === '#bot-commands channel ID') {
                    if (arguments[2] != undefined) {
                        message.channel.send('<@' + sender + '>\'s game in ' + arguments[1] + ' has ' + arguments[2] + ' slots open! <@&ping role ID>')
                    } else {
                        message.reply('too few arguments. Use !help to see proper command usage.')
                    }
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use one of the game channels or #matchmaking to run this command.'
                        }],
                    }})
                }
            break;

            case 'gamefull':
                if(sendChannel === '#bot-commands channel ID') {
                    if (arguments[1] != undefined) {
                        message.channel.send('<@' + sender + '>\'s game in ' + arguments[1] + ' is full!')
                    } else {
                        message.reply('too few arguments. Use !help to see proper command usage.')
                    }
                } else {
                    message.reply({embed: {
                        color: 0x2ed32e,
                        fields: [{
                            name: "Oops!",
                            value: 'Wrong channel; please use one of the game channels or #matchmaking to run this command.'
                        }],
                    }})
                }
            break;
         }
     }
});
