const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için "**Yönetici**" Yetkisine Sahip Olmalısın!')
    let guild = "740415701063303168";
const bir = client.emojis.cache.find(emoji => emoji.name === "1_11");
const iki = client.emojis.cache.find(emoji => emoji.name === "2_11");
const uc = client.emojis.cache.find(emoji => emoji.name === "3_11");
const dort = client.emojis.cache.find(emoji => emoji.name === "4_11");
const bes = client.emojis.cache.find(emoji => emoji.name === "5_11");
const alti = client.emojis.cache.find(emoji => emoji.name === "6_11");
const yedi = client.emojis.cache.find(emoji => emoji.name === "7_11");
const sekiz = client.emojis.cache.find(emoji => emoji.name === "8_11");
const dokuz = client.emojis.cache.find(emoji => emoji.name === "9_11");
const sifir = client.emojis.cache.find(emoji => emoji.name === "0_11");
 
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  var msg = message;
  var üyesayısı = msg.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`}[d];
      })
    }/////////////////////////////
  var sessayı = count.toString().replace(/ /g, "    ")
  var üs2 = sessayı.match(/([0-9])/g)
  sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs2) {
    sessayı = sessayı.replace(/([0-9])/g, d => {
      return {
    "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`}[d];
    })
    }
  
  /////////////////////////////////////////
    var bostbasansayi = message.guild.roles.cache.get('751084962572271628').members.size.toString().replace(/ /g, "  ")
  var üs2 = bostbasansayi.match(/([0-9])/g)
  bostbasansayi = bostbasansayi.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs2) {
    bostbasansayi = bostbasansayi.replace(/([0-9])/g, d => {
      return {
      "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`}[d];
    })
    }
  /////////////////////////////////////////
  var tagdakiler = 0;
  let tag = "Ꮰ";
  message.guild.members.cache.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
  }  
  })
  var tagdakilerr = tagdakiler.toString().replace(/ /g, "")
  var üs3 = tagdakilerr.match(/([0-9])/g)
  tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs3) {
    tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {
      return {
    "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`}[d];
    })
    }
  /////
 //////////////////////////////////////////////////////////////


const boostsayısı = message.guild.premiumSubscriptionCount

var boostsayı = boostsayısı.toString().replace(/ /g, "")
var BoostSayı = boostsayı.match(/([0-9])/g)
boostsayı = boostsayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(BoostSayı) {
  boostsayı = boostsayı.replace(/([0-9])/g, d => {
    return {
     "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`
    }[d];
   })
  }


  /////////////////////////////////////
  /////
  var onlayn = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
  var üs4= onlayn.match(/([0-9])/g)
  onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs4) {
    onlayn = onlayn.replace(/([0-9])/g, d => {
      return {
    "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`}[d];
    })
    }
  //  JustWatchᏠBOYᏠDestroy.exe#1881   ||    MEE7 BOTUMU EKLEYİNN :d
let emoji1 = `<a:kelebek_11:753606558323179550>`;
 const embed1 = new Discord.MessageEmbed()
 .setColor('#00ffb9')
 .setAuthor('')
 .setDescription(` ${emoji1} **Sunucumuzda Toplam ** ${üyesayısı} **Kişi bulunmakta.** \n\n ${emoji1} **Sunucumuzda Toplam** ${onlayn} **Aktif Kişi Bulunmakta** \n\n ${emoji1} **Ses kanallarında Toplam** ${sessayı} **Bulunmakta** \n\n ${emoji1} **Tagımızda Toplam **${tagdakilerr} **Kişi Bulunmakta** \n\n ${emoji1} **Boost Basan Toplam ** ${bostbasansayi} **Kişi bulunmakta**\n\n ${emoji1} **Sunucunun Toplam Boost Sayısı**  ${boostsayı}`)
 .setFooter(``)
 
     const hata = new Discord.MessageEmbed()
    .setColor('000000')
    .setAuthor(`Hata`)
    .setDescription(`**Bi Git Yetki Alda Gel Aq**`)
 
  msg.channel.send(embed1);
  

  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','say','say'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}