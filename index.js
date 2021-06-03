const discord = require("discord.js");
const wallets = require('./config')
const fetch = require('node-fetch')
const moment = require('moment')
let hash = ''
function showpkt(amout) {
    return `${parseFloat(amout/0x40000000).toFixed(2)} PKT`
}
function getusd(pkt,price) {
    return parseFloat(pkt/0x40000000* parseFloat(price)).toFixed(2)+ ' USD'
}
setInterval(() => {
    fetch.default(
        "https://explorer.pkt.cash/api/v1/PKT/pkt/chain/down/1/1",
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "sec-ch-ua":
              '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "cross-site",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      ).then(async (res) => {
        const json = await res.json();
        json.results.forEach(async (block) => {
          if (block.hash == hash) {
              return
          }
          hash = block.hash
          const fetch1 = await fetch.default(`https://explorer.pkt.cash/api/v1/PKT/pkt/block/${block.hash}/coins`)
          const json1 = await fetch1.json()
          const fetch3 = await fetch.default("https://pktticker.tonygaitatzis.com/api/1.0/spot/PKT/USD/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": "Api-Key aRCSn3Hr.fuR7T8qLI6G5eyU7deXHhyVf7hJ4epHP",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1"
  },
  "referrer": "https://pktprice.tonygaitatzis.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
})
          const json3 = await fetch3.json()
          json1.results.forEach(async (trx) => {
              if (!trx.input.length == 0) {
                  return;
              }
              wallets.forEach(async wallet => {
                const o = trx.output.find(o => o.address ==wallet.wallet)
                if (!o) return
                const fetch2 = await fetch.default(`https://explorer.pkt.cash/api/v1/PKT/pkt/address/${wallet.wallet}`)
                const json2 = await fetch2.json()
                const pktrecived = showpkt(o.value)
                const fulltrx = showpkt(trx.value)
                const price = parseFloat(json3.price)
                const emb = new discord.MessageEmbed()
                .setAuthor('💸 İncome','https://media.discordapp.net/attachments/824677886740004884/849539298210742302/6c42ea9f3e233d9110e04dcd87db55da.png') 
                .setDescription(wallet.wallet+' address got an income')
                .addField('Total PKT for Block',fulltrx,true)
                .addField('Last Income',pktrecived,true)
                .addField('Last Income for 24H',showpkt(json2.mined24),true)
                .addField('PKT Balance',showpkt(json2.balance),true)
                .addField('Value of last income',getusd(o.value,price),true)
                .addField('Value of Last income for 24h',getusd(json2.mined24,price),true)
                .addField('USD Balance',getusd(json2.balance,price),true)
                .setFooter('Mined Block at')
                .setColor('GREEN')
                .setTimestamp(moment(block.time).valueOf())
                wallet.hook.send(emb)
              })
          })
      });
      });
}, 5000);
