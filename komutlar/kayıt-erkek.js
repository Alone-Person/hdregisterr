const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['740415701075886127'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "Ꮰ"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '740415701080080390')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '740415701080080393')
const genelchat = message.guild.channels.cache.find(c => c.id === "740415701755625536");

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?\n **örnek**\nh!e @etiket Yiğit 23')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
  const agla = new Discord.MessageEmbed()
 genelchat.send(`<@${stg.user.id}> **Aramıza Hoş Geldin, Keyifli Vakitler Geçirmeni Dileriz.**`)  
  
  
  let embed5 = new Discord.MessageEmbed()
 .setColor('RANDOM')
  .setImage('https://cdn.discordapp.com/attachments/756969726034313406/762304211446005770/giphy.gif')
  .setTitle('Kayıt Tamamlandı')
 .setDescription(`
Adı : \`${isim}\`
Yaşı: \`${yas}\`
Tag : \`${tag}\`
Kayıt İşleminde Verilen Rol : <@&${kayıtlı.id}>
Kayıt İşleminde Alınan Rol : <@&${kayıtsız.id}>
Kayıt Edilen : <@${stg.user.id}>
Kayıt Eden Yetkili : <@${message.author.id}>
Toplam Kayıt Sayısı : \`${kayıtlar}\`

`)
message.channel.send(embed5)
const embed = new Discord.MessageEmbed()

.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`HelmsDeep ❤️ Yiğitcan`)
.setColor('GREEN')
client.channels.cache.get('740415703231758362').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['erkek','e','man','boy'],
    permLevel: 0
};

exports.help = {
    name: 'erkek',
};