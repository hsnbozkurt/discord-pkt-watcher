# Discord 1PKT Watcher v1.0.0
This project helps you get better information about your wallet in discord!

![Example](https://imgs.theyka.net/screenshot65-03-06-2021-22-37.png)

# Setup

1 - Install Node.JS to your computer.  
``https://nodejs.org/en/download/current/``

2 - Install project to your computer.  
  ``git clone https://github.com/SadMap/discord-pkt-watcher.git``

3 - Create a Discord WebHook      
   - Go to channel settings  
     ![Channel Setting Example](https://imgs.theyka.net/screenshot945-03-06-2021-22-46.png)  
   - Click integrations  
     ![Integrations Example](https://imgs.theyka.net/screenshot195-03-06-2021-22-53.png)  
   - Click Create WebHook  
     ![Webhooks Example](https://imgs.theyka.net/screenshot894-03-06-2021-22-55.png)  
   - Give it a name and copy webhook url  
     ![Webhook Settings](https://imgs.theyka.net/screenshot710-03-06-2021-22-56.png) 
   - Open webhook url in your browser. Copy ID and Token  
     ![Webhook Informations](https://imgs.theyka.net/screenshot475-03-06-2021-22-58.png)  

4 - Setup config.js
   - Open Config.JS file  
    Change WebHookID with your Webhook ID (you can get it with opening webhook url in browser)  
    Change WebHookToken with you Webhook token (you can get it with opening webhook url in browser)  
    Change PktWalletAddress with your pkt1 Wallet Address (you can get it from creating a wallet [Click Me](https://docs.pkt.cash/en/latest/pktd/pktwallet/))

5 - Install Modules  
   - Open CMD or Terminal in project directory
   - Run ``npm i``

6 - Run Project  
   - Open CMD or Terminal in project directory
   - Run ``npm index.js``

# Multiple Wallet  
  - Change config to  
  ```javascript
const discord = require('discord.js')
const wallet1 = {hook:new discord.WebhookClient('WebHookID','WebHookToken'),wallet:'PktWalletAddress'}
const wallet2 = {hook:new discord.WebhookClient('WebHookID','WebHookToken'),wallet:'PktWalletAddress'}
module.exports = [wallet1,wallet2]
```  
Edit WebHookID, WebHookToken and PktWalletAddress lines
