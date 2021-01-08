const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

const iltifatlar = [
  "Ömrümün en güzel mevsimi sensin.",
  "Sıradan bir ismi nasıl da güzelleştiriyorsun sen.",
  "Fazlası zarar olmayan iki şey; biri sen biri kokun.",
  "Bir gülüşü var, kelebek görse ömrü uzar.",
  "Seni kokladığımda, nefes aldığımı hatırlıyorum.",
  "Harflerin gülüştüğünü senin adında gördüm.",
  "Gölgeni dahi değişmem en güzel manzaraya.",
  "Seninle karşılaştım ya… Birileri benim için dua etmiş.",
  "O kadar güzelsin ki, manzaralar seni seyretsin.",
  "Kimselere söyleme. Ben ‘Seni’ yazarım, onlar şiir zanneder.",
  "Başıma gelen güzel şeylerin nedeni hep sensin.",
  "Papatya gibisin beyaz ve ince, eziliyor ruhum seni görünce.",
  "Sen, benim gelmiş geçmiş en muhteşem kararımsın.",
  "Kitaplarda altını çizdiğim güzel cümlelerin hepsi sana gelsin.",
  "Gamzen varsa, aksesuarların en güzeli sende demektir.",
  "Gözlerim görmezden geliyor seni, ama kalbim sevmezden gelemiyor.",
  "Bazı insanlar bulutlara benzer gittiklerinde hava güzelleşir.",
  "Senden ne köy olur ne de kasaba. Sen gel kalbimin başkenti ol!",
  "Sen benim arayıp da bulduğum değil, hiç aklımda yokken aşık olduğumsun.",
  "Şimdi sen bilmezsin, benim sana dokunmadan sarılmışlığım var.",
  "Ben seni sevmek için değil, sevmek nasıl olurmuş gör diye sevdim.",
  "Lütfen üzerine alın! Kimseyi görmedim ben, senden daha güzel gülen.",
  "Güneş mi doğmuş yoksa sen mi gülümsedin :)",
  "Seni dünyanın en güzel 8. harikası seçiyorum :)",
  "Aslında dünyanın 7 harikası yok 1 tane harikası var; O da senin kalbin.",
  "Gözlerine bakınca cenneti görüyorum bir tanem, güzel gözlerinden sen sorumlusun.",
  "Şimdi bana öyle bir söz söyle ki, ilk söyleyen sen, ilk duyan ben olayım.",
  "Hayatındaki herkes sana ‘muhalefet’ ediyorsa tadını çıkar, demek ki ‘iktidar’ sensin!",
  "Denizi mavi gösteren gökyüzüdür ya hani. Beni de mutlu gösteren sensin.",
  "Benim yüreğim sensin şimdi; seni vurur durur. Ve yine damla damla çoğalıyorsun içimde.",
  "Ne bileyim be sevgili. Öyle güzel baktın ki gözlerime, sevmek değil ölmek geldi içimden.",
  "İçim o kadar senle doldu ki, insanlar seni gözbebeklerimde görürler diye bakmaya korkar oldum.",
  "Sen bir erkeğin isteyip de elde edemediği varlıksın. Sen yalan dünyaya gönderilmiş tek gerçeğimsin.",
  "Sen benim gözümün daldığı, yüreğimin yandığı ve aklımın kaldığı tek gerçeksin. Nerede olursa ol sen bende ‘cansın’.",
  "Şimdi ben sana ne şiir yazsam, mutlaka kusurlu kalacak güzelliğinin yanında. Demem o ki; bırak yazdıklarımı, aç Kur’an-ı Kerim oku sevgilim!",
  "Şafak vakti yağan çiğ tanesi kadar masum, gün batımında denizlerden esen rüzgar kadar çılgın ve okyanusun derinliklerindeki inci taneleri kadar özelsin.",
  "Sen benim mucizemsin, mucizelere inanma sebebimsin.",
  "Saçlarının 1 teli olmak isterdim hep yanında kalmak için.",
  "Dertlerini bana ver sevinçler senin olsun. Sen sevilmeye değersin.",
  "Seni yaşadığım kadar hayatı yaşasaydım hayatımda kimse olmazdı.",
  "Dünyanın 7 harikası bile senin yanında değersiz kalır sen benim içimdeki dünyamın tek harikasısın!",
  "Sesini duyunca kara bulutlar dağılıyor, yaprak döken ağaçlar yeşeriyor, göç eden kuşların sesleri geliyor. İyi oluyorum.",
  "Kadın dediğin; İstanbul gibi olmalı. Fethi zor, fatihi tek!",
];
client.on("message", async message => {
  if(message.channel.id !== "740415701755625536") return;
  let codeAcademy = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(codeAcademy >= 20) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});


//sesli kanal
client.on("ready", async function() {
  const ses = "758970840746033164";
  client.channels.cache.get(ses).join();
});
//sesli kanal son

///
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS'
///


//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('740415701080080393'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG



client.on("guildMemberAdd", async (member) => {
  var Unregister = "740415701080080393"
  await member.roles.add(Unregister).catch(e => console.log(e))
  }
  );


client.on('guildMemberAdd', async member => { 
  await member.setNickname(`Ꮰ İsim | Yaş`)
 let user = client.users.cache.get(member.id);
let zaman = new Date().getTime() - user.createdAt.getTime()
var takizaman = [];
if(zaman < 604800000) {
takizaman = '• Tehlikeli'
} else {
takizaman = `• Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.cache.find(x => x.id === `740415701398978650`)
  const taki = new Discord.MessageEmbed()
 .setTitle(
     "HelmsDeep'e Hoşgeldin"
   )
   .setDescription(`
╔▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
║► <a:tac:743079079401488455> **・** **Sunucumuza Hoş geldin** ${member} 
║   
║► <a:syhbeaz:743079067951169616> **・Seninle Beraber** ${member.guild.memberCount} **Kişiyiz**
║
║► <a:loading_11:758436271457566740> **・** **Kaydının Yapılması İçin İsmini ve Yaşını Yaz**
║
║► <a:s_a:747919979755864195> **・** **Ailemize Katılmak İçin ve Kayıt Olmak İçin** **(** \`Ꮰ\` **)** **Tagımızı Almalısın.**
║
║► <a:gold:743079056324689921> **・**<@&740415701075886127> **Rolündeki Yetkililer Seninle İlgilenecektir**
║
║► <a:sonz:743079066852261971> **・** **Sunucumuzun Sınırsız Davet Bağlantısı** https://discord.gg/47aVsDu
║
║► <:kanallar_11:758436269579173929> **・** **Hesap Açılalı** ${gecen} **Olmuş**
║
║► <a:ZilGif:763547564909527071> **・** **Bu Kullanıcı** **|** **${takizaman}**
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
`)
.setImage('https://media.discordapp.net/attachments/713795753490907217/715815335638466690/Main_Render.gif')
.setColor('BLACK')
message.send(taki)
 
         }); 

client.on("guildMemberAdd", async member => {

client.channels.cache.get("740415701398978650").send(`
╔▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
║► <a:gold:743079056324689921> <@&740415701075886127> **Yeni Gelen Arkadaşa Yardımcı Olun Lütfen**
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`).then(a=>a.delete({timeout:1000}));
})
  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

client.on('message', message => { 
if (message.channel.id == "777859002783760404") { 
message.react('764883749266653224')//1 message.react('Emoji ID')//2
 } })
//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Ꮰ'
  const sunucu = '740415701063303168'
  const kanal = '740415702992683104'
  const rol = '740415701075886129'
  const rol2 = '740415701080080390'
  const rol3 = '740415701080080389'
  const rol4 = '740415701080080393'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} \`${tag}\` **Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam** \`${newUser.username}\`, **Sunucumuzda** \`${tag}\` **Tagımızı Aldığın İçin** \`${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` **Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} \`${tag}\` **Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol2);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol3);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol4);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam** \`${newUser.username}\`, **Sunucumuzda** \`${tag}\` **Tagımızı Çıkardığın İçin** \`${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` **Rolünü Ve Diğer Rolleri Senden Aldım Kayıtsıza Düştün!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});




//-----------------------OTO-TAG-----------------------\\ 

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('740415701063303168'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "Ꮰ"; // Buraya Ekip Tag
  var tagrol = "740415701075886129"; // Buraya Ekip Rolünün ID
  var kanal = "740415702992683104"; // Loglanacağı Kanalın ID

 
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`\`Ꮰ\` **Tagımızı Aldığın İçin Teşekkürler! Aramıza Hoş geldin.**`);
      await client.channels.cache.get(kanal).send(`${yeni} **Adlı Üye Tagımızı Alarak Aramıza Katıldı!**`);
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`\`Ꮰ\` **Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;**\n**Tagımız:** \`${tag}\``);
      await client.channels.cache.get(kanal).send(`${yeni} **adlı üye tagımızı bırakarak aramızdan ayrıldı!**`);
    } catch(err) { console.error(err) };
  };
});
client.on('message', message => {
let otaqu = message.content.toLowerCase()

if(otaqu === 'tag') {
message.channel.send(`**Ꮰ**`)
}
})
////

////
 client.on('message', message => {
let otaqu = message.content.toLowerCase()

if(otaqu === 'yiğit') {
message.channel.send(`**Yes ?**`)
}
})

client.on('message', message => {
let otaqu = message.content.toLowerCase()

if(otaqu === '<@!447068066271068161>') {
message.channel.send(`**Ona Etiket Atmamalısın Adam Yoğun amk Lütfen Bida Etiket Atma!**`)
}
})
//[------------------------------SES LOG------------------------------]//
client.on('voiceStateUpdate', async (oldState, newState) => {
  if (!oldState.channelID && newState.channelID) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi__** \`${newState.guild.channels.cache.get(newState.channelID).name}\` **__adlı sesli kanala girdi!__**`);
  if (oldState.channelID && !newState.channelID) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi__** \`${newState.guild.channels.cache.get(oldState.channelID).name}\` **__adlı sesli kanaldan ayrıldı!__**`);
  if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi ses kanalını değiştirdi!__**  (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`);
  if (oldState.channelID && oldState.selfMute && !newState.selfMute) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi__** \`${newState.guild.channels.cache.get(newState.channelID).name}\` **__adlı sesli kanalda kendi susturmasını kaldırdı!__**`);
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi__** \`${newState.guild.channels.cache.get(newState.channelID).name}\` **__adlı sesli kanalda kendini susturdu!__**`);
  if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` **__üyesi__** \`${newState.guild.channels.cache.get(newState.channelID).name}\` **__adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!__**`);
  if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return newState.guild.channels.cache.get('775652185991544842').send(`\`${newState.guild.members.cache.get(newState.id).displayName}\`**__üyesi__** \`${newState.guild.channels.cache.get(newState.channelID).name}\` **__adlı sesli kanalda kendini sağırlaştırdı!__**`);
});
//[------------------------------SES LOG------------------------------]//

client.on("guildMemberAdd", member => {
let otorol = ayarlar.otorol
if(!otorol) return
member.roles.add(otorol)
})
//Sunucuya giren kullanıcılara ayarlar.json daki otorolü veriyor. Ayrıca kayıt kanalına bir mesaj ataıyor.
	const logs = require('discord-logs');
logs(client);
client.on('guildMemberBoost', (member) =>  {
let kanal = client.channels.cache.get('740415701398978659');
kanal.send(`\`${member.user.tag}\` **Kullanıcısı** \`${member.guild.name}\` **Sunucusuna Boost Bastı!**`);
member.send(`\`${member.guild.name}\` **Sunucusuna Boost Bastığın İçin Teşekkürler!**`);
});
//
client.on("guildMemberUpdate", async function(oldMember, newMember){
let sunucuID = "740415701063303168"
let boosterROLID = "751084962572271628"
let logID = "740415701398978659"



if(oldMember.guild.id !== sunucuID) return
  
if(oldMember.roles.cache.has(boosterROLID)) { 
if(!newMember.roles.cache.has(boosterROLID)) return oldMember.guild.channels.cache.get(logID).send("<@"+oldMember.id+"> **Kişisi Boostunu** **__Çekti__** **Ey Ahaliii!**")
}
});
//////////////

///////////////////////
