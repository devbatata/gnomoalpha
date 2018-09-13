const Discord = require("discord.js"); //baixar a lib
var randomPuppy = require("random-puppy")
const gifSearch = require("gif-search")
const json = require("json");
var Jimp = require("jimp")
const tempo = require('weather-js');
const client = new Discord.Client();
const config = require("./config.json");
var cor = "#7401DF"
const moment = require("moment");
require("moment-duration-format")
const ascii = require("ascii-art");
var args = new Discord.Client();
var bot = new Discord.Client();


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
  client.user.setPresence({ game: { name: `Ola Escreva ${config.prefix}ajuda Para Mais Informaçoes`, type: 1, url: 'https://www.twitch.tv/mrbatata'} });
// caso queira o bot trasmitindo use:
/*
   client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/ladonegro'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
      */
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setPresence({ game: { name: `Ola Escreva ${config.prefix}ajuda Para Mais Informaçoes`, type: 1, url: 'https://www.twitch.tv/mrbatata'} });
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setPresence({ game: { name: `Ola Escreva ${config.prefix}ajuda Para Mais Informaçoes`, type: 1, url: 'https://www.twitch.tv/mrbatata'} });
});

bot.on('guildMemberAdd', guild => {
    const batatatop = `${bot.guilds.get('432307585152974850').memberCount}`
    const gg = bot.channels.get("483174741717286922")
    gg.setTopic(batatatop)

  });


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send('Testando... |')
    var ping = new Discord.RichEmbed()
          .setTimestamp()
          .setTitle(':ping_pong: Ping :ping_pong:')
          .setThumbnail(`${message.author.avatarURL}`)
          .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
          .setColor('81F7F3')
          .addField(":beginner: Seu Ping :beginner:", `${m.createdTimestamp - message.createdTimestamp}Ms`, true)
          .addField(":star: Ping Da Api :star:", `${Math.round(client.ping)}Ms`, true)
          message.channel.send(ping);
}
  //comando falar
  if(comando === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }
//comando apagar
  if(comando === "apagar") {
    if(!message.member.roles.some(r=>["ADM", "CHEFES"].includes(r.name)) )
      return message.reply("Desculpe, Apenas Cargos (CHEFES) e (ADM) Pode Utilizar Este Comando!");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
  // comando chutar
  if(comando === "kick") {
//adicione o nome dos cargos que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["ADM", "CHEFES"].includes(r.name)) )
      return message.reply("Desculpe, Apenas Cargos (CHEFES) e (ADM) Pode Utilizar Este Comando!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.kickable)
      return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";

    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);

  }
  // comando ban
  if(comando === "ban") {
    //adicione o nome do cargo que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Chefes"].includes(r.name)) )
      return message.reply("Desculpe, Apenas (Chefes) Pode Usar Este Comando!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.bannable)
      return message.reply("Eu não posso banir este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de banir?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
    message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
  }



  if(comando === "reiniciar") {
    if(message.author.id !== "488440134648463360") return message.channel.send('Apenas o </Batata> pode utilizar este comando.');
      resetBot(message.channel)
          async function resetBot(channel) {
            channel.send('Reiniciando... | <a:carregando:488175640743510026>').then(message => {
      setTimeout(() => { message.delete() }, 10000)
  })
              .then(msg => client.destroy(true))
              .then(() => client.login(config.token));
            }
      client.on('ready', () => {
          message.channel.send(`Bot reiniciado com sucesso!<:white_check_mark:488199174307708929>`);
      });
    }
    if(comando === "meme") {
      randomPuppy('memes')
.then(url => {
    var memeEmbed = new Discord.RichEmbed()
        .setTimestamp()
        .setTitle('Meme entregue:')
        .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
        .setDescription(`Comando solicitado por: ${message.author.username}`)
        .setImage(url)
        .setColor('36393e')
    message.channel.send(memeEmbed);
});
    }



    if(comando === "tempo") {
      tempo.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        if (err) return message.channel.send(err);

        if (result.length === 0) {
            message.channel.send('Selecione uma cidade para pesquisar o tempo!' )
            return;
        }
            var Tempo = result[0].current;
            var Local = result[0].location;

        let embed = new Discord.RichEmbed()
            .setColor(`#38c6ff`)
            .setAuthor(`Tempo de ${Tempo.observationpoint}`)
            .setThumbnail(Tempo.imageUrl)
            .addField('<:relogio:488895595516526603>|Fuso horário :', `${Local.timezone} UTC`, true)
            .addField('<:termometro2:488894099882115103>|Tipo de grau :', Local.degreetype, true)
            .addField('<:termometro:488892575932219403>|Temperatura :', `${Tempo.temperature} graus`, true)
            .addField('<:termometro:488892575932219403>|Em torno dos:', `${Tempo.feelslike} graus`, true)
            .addField('<:ventos:488893377002209293>|Ventos:', Tempo.winddisplay, true)
            .addField('<:agua:488893801356591104>|Umidade do Ar:', `${Tempo.humidity}%`, true)
            .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
        message.channel.send(embed);
        });
    }
    if(comando === "gif") {
      let pesq = args.join(" ")
      gifSearch.random(pesq).then(
        gifUrl => message.channel.send({embed: {
          title: `Resultado da pesquisa de gifs: ${pesq}`,
          image: {url: gifUrl}
    }})
);
    }

    if(comando === '@483367432824553473') {
      message.reply(`Menciona Seu Pai Opa Esqueci Voce Nao Tem; -;`)

    }
    if(comando === 'escolha') {
      const args = message.content.split(" ").slice(1);
const prefix = '.'
if(!args[2]) return message.reply("Por favor, faça a pergunta completa")
let replies = ["Sim.", "Não.", "Eu não sei.", "talvez."]

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

let ballembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor('#ffe200')
.addField('Questão', question)
.addField("Resposta", replies[result])
.setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)

message.channel.send(ballembed);
    }

    if(comando === 'palavras'){
      if(message.content.split(' ').slice(1).join(' ').length < 1) {
        message.channel.sendMessage('| Você não escreveu nada.')
    } else {
        if(message.content.split(' ').slice(1).join(' ').length > 50) {
            message.channel.sendMessage('| Você ultrapassou o limite de 50 caracteres.')
        } else {
            if(message.guild.member(client.user).hasPermission('ATTACH_FILES')) {
                var authorMessage = message
                message.channel.sendMessage('<a:carregando:488175640743510026> | Aguarde...').then(message => {
            Jimp.read(`http://i.imgur.com/xXUtLqH.png`, function (err, image) {
            if (err) message.channel.sendMessage('| Ocorreu um erro ao criar a imagem.')
            Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
            image.print(font, 11, 13, authorMessage.content.split(' ').slice(1).join(' ')[0] + '... ' + authorMessage.content.split(' ').slice(1).join(' ')[0] + '...', 400)
            image.print(font, 19, 290, authorMessage.content.split(' ').slice(1).join(' '), 320)
            var aguardeMessage = message
            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            message.channel.sendFile(buffer, 'imagem.png', '🖼 | <@' + authorMessage.author.id + '>').then(message => {
                aguardeMessage.delete()
            })
            })
            })
            })})
            } else {
                message.channel.sendMessage('❌ | Eu não tenho a permissão necessária para fazer isso. `ATTACH_FILES`')
            }
        }

    }
}
    if(comando === 'corrida'){
      let user = message.mentions.users.first();
          if (!user) return message.reply('**Você não mencionou o usuario que você quer correr!**').catch(console.error);
          const Corrida = "<@" + message.author.id + ">"
          const corrida2 =  " <@" + user.id + ">"
          var falas = [" fez **200** metros 🏎 ....."," fez **500** metros 🏎 ..........."," fez **800** metros 🏎 .............."," fez **1000** metros 🏎 ................."," fez **1500** metros 🏎 ............................","Explodiu 🔥 ","Bateu e pegou fogo 🔥" ]
          message.channel.send({
              "embed": {
                  "title": "🏎 Corrida",
                  "description": " O " + Corrida + " e" +  corrida2 + " **estao disputando uma corrida**" ,
                  "color": "65535",

                  "fields": [
                      {
                          "name":"Sobre a corrida:",
                          "value":  "O " + Corrida +  "\n" + falas[Math.round(Math.random() * falas.length)]  + "\n" +  "O " + corrida2 +  "\n" + falas[Math.round(Math.random() * falas.length)],
                          "inline": false
                        }
                    ]
                }
            })
    }
    if(comando === 'unban'){
      if(!message.guild.me.hasPermission(0x00000004)) return message.channel.send({embed: {
        description: `eu não tenho a permissão para desbanir membros`
    }})
    let member = args[0]
    let reason = args.slice(1).join(" ")
    if(!reason) {
        reason = "Não informado"
    }
    if(!member) return message.channel.send({embed: {
        description: `você não me disse o membro que tenho que desbanir`,
 }})
    message.guild.unban(member).then(() => {
        message.channel.send({embed: {
            title: `Membro desbanido`,
            fields: [
                {
                    name: "Motivo:",
                    value: `${reason}`
                }
            ]
        }})
    })
    }



    if(comando === 'time'){
        let duration = moment.duration(client.uptime).format('D [d], H [h], m [m], s [s]');
        let nomeeapelido = message.guild.member(message.author.id).nickname || message.author.username;

        var ontime = new Discord.RichEmbed()
          .setTimestamp()
          .setTitle('Tempo Acordado')
          .setThumbnail(`${message.author.avatarURL}`)
          .setImage("https://media0.giphy.com/media/3oxHQekxCkWxaTP1h6/giphy.gif")
          .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
          .setColor('00ff00')
          .setDescription(`Eae **${nomeeapelido}** Beleza?\nEstou Acordado a **${duration}** `)
            message.channel.send(ontime);
}


if(comando === 'ajuda'){
      var ajuda = new Discord.RichEmbed()
            .setTimestamp()
            .setTitle('Olá Meu Nome è Gnome Alpha')
            .setThumbnail(`${message.author.avatarURL}`)
            .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
            .setColor('81F7F3')
            .setImage(`https://i.imgur.com/vXRfAd6.gif`)
            .setDescription('**.Ban (Usuario)** = Banir Usuario Mencionado\n \n**.kick (Usuario)** = Expulsa o Usuario Mencionado\n \n**.Palavras (palavra)** = Manda Uma Foto com A Palavra\n \n**.corrida (@usuario)** = Abre Uma Corrida entre Voce e O Mencionado\n \n**.limpar (Qtd)** = Limpa a Quantidade De Mensagens Que Voce Escolheu\n \n**.time** = Mostra a Quando Tempo o Bot Esta Online\n \n**.meme** = Envia um Meme Aleatorio\n \n**.gif (pesquisa)** = Pesquisa Um Gif Conforme a Palavra Chave\n \n**.escolha (palavra)** = Escolhe Se Sim/Nao/Talvez\n \n**.tempo (local)** = Mostra o Clima do Local Dito\n \n**.botinfo** = Mostra Informaçoes do Bot\n \n**.avatar (@NOME)** = Mostra o Avatar do Mencionado\n \n**.servidores** = Mostra em Quandos Servidores o Bot Esta\n \n**.convite** = Cria Um Convite Do Servidor**\n \nTEMOS MAIS COMANDOS EM BETA LOGO MAIS LIBERAREI**')
            message.author.send(ajuda);
      var ajuda2 = new Discord.RichEmbed()
            .setTimestamp()
            .setTitle('Ajuda')
            .setThumbnail(`${message.author.avatarURL}`)
            .setImage(`https://i.imgur.com/vXRfAd6.gif`)
            .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
            .setColor('81F7F3')
            .setDescription(`Ola **${message.author.username}** Envei As Informaçoes Em Seu Privado!`)
            message.channel.send(ajuda2);
    }
    if(comando === 'teste2'){
      var teste3 = new Discord.RichEmbed()
            .setTimestamp()
            .setTitle('Ajuda')
            .setThumbnail(`${message.author.avatarURL}`)
            .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
            .setColor('81F7F3')
            .addField("Inline Field", "They can also be inline.", true)
            .addField("Inline Field2", "They can also be inline2.", true)
            .addField("Inline Field3", "They can also be inline3.", true)
            .addField("Inline Field4", "They can also be inline4.", true)
            message.channel.send(teste3);
    }
    if(comando === 'avatar'){
      let member = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
    let avatar = member.displayAvatarURL;
    if (avatar.endsWith(".gif")) {
        avatar = `${member.displayAvatarURL}?size=2048`
    }
    message.channel.send({
        embed: {
            title: `${member.tag}`,
            description: `[Link Direto](${avatar})`,
            image: {
                url: avatar
            }
        }
    })
    }

    if(comando === 'ascii'){
      ascii.font(args.join(" "), 'Doom', function(rendered){

        rendered = rendered.trimRight();

        if(!args[0] > 15) return message.reply('Limite de 15 palavras atingidas')

        message.channel.send(rendered, {
            code: 'md'
        });
    });
    }
    if(comando === 'servidores'){
      var servidores = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(`Eae ${message.author.username}`)
      .setThumbnail(`${message.author.avatarURL}`)
      .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
      .setColor('81F7F3')
      .setDescription('Aquie Estao Algumas Informaçoes Sobre Mim!')
      .addField("Servidores", `${client.guilds.size}`, true)
      .addField("Pessoas", `${client.users.size}`, true)
      .addField("Canais", `${client.channels.size}`, true);
      message.channel.send(servidores);
    }
    if(comando === 'botinfo'){
      var informacoes = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(`Informaçoes do Gnomo Alpha`)
      .setThumbnail(`${message.author.avatarURL}`)
      .setFooter(`Copyright © 2018 | </Batata>`, `https://i.imgur.com/k9wVqGl.png`)
      .setColor("2EFE2E")
      .setDescription('Aquie Estao Algumas Informaçoes Sobre Mim!')
      .addField(":pencil2:|Nome", `Gnomo Alpha`, true)
      .addField(":symbols:|Meu Id", `483367432824553473`, true)
      .addField("<:data:488449577075081217>|Nascido Em", `01|Setember|12:45`, true)
      .addField("<:rg:488449828154638339>|Nome Completo", `Gnomo Alpha#7321`, true)
      .addField("<:servidores:488450132623491084>|Servidores", `${client.guilds.size}`, true)
      .addField(":busts_in_silhouette:|Pessoas", `${client.users.size}`, true)
      .addField(":beginner:|Criador", `</Batata>ヅᶠᵘᶜᵏᵧₒᵤ#9627`, true)
      .addField("<:js:488445742998880286>|JavaSript", `v8.11.4`, true);
      message.channel.send(informacoes);
    }
    if(comando === '<:ban:488452150117269524>'){
      if(!message.member.roles.some(r=>["Chefes"].includes(r.name)) )
        return message.reply("Desculpe, você não tem permissão para usar isto!");
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Por favor mencione um membro válido deste servidor");
      if(!member.bannable)
        return message.reply("Eu não posso banir este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de banir?");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "Nenhuma razão fornecida";
      await member.ban(reason)
        .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
      message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
    }

    if(comando === 'convite'){
    try {
    const invite = await message.channel.createInvite({maxAge: 0});
    message.reply(`:incoming_envelope: **Convite Criado:** \n ${invite}`)
} catch (err) {
    message.reply(':xShiina: **Eu não tenho permissão para criar um convite deste servidor.**')
   }
}


    if (message.content.includes("https://discord.gg/")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.reply("❌ **Você não pode divulgar aqui!**");
        }

    }
    if(comando === '<@483367432824553473>'){
     message.channel.send('masuki é isu');
}


});

bot.on('guildMemberAdd', member => {
    var Role = member.guild.roles.find('id', '488487925357608963');
    member.addRole(Role)
})

client.login(config.token);
