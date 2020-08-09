'use strict';
const BootBot = require('bootbot');
// const config = require('config');


const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

/* bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
}); */

bot
.on('authentication', (payload, chat, data)=>{
  console.log(data);
  console.log(payload);
  chat.say(
    `Salam sejahtera dan selamat bergabung.
    Nama saya Nilam. 
    Ketik "help" kalau butuh bantuan ya...`);
})
.hear(['help'], (payload, chat) => {
	chat.say({
		text: 'Apa yang bisa dibantu?',
		buttons: [
			{ type: 'postback', title: 'Kunjungi Website', payload: 'HELP_VISIT_SITE' },
			{ type: 'postback', title: 'Kunjungi Grup KPPDI', payload: 'HELP_VISIT_GROUP' },
			{ type: 'postback', title: 'Chat dengan Admin', payload: 'HELP_CHAT_WITH_ADMIN' }
		]
	});
})
.hear([
  'hello', 
  'hi', 
  /hey( there)?/i,
  'halo',
  'hallo',
], (payload, chat) => {
  console.log('The user said "hello", "hi", "hey", or "hey there"');
  chat.say(`Hi..! Apa kabar?`);
})
.hear([
  /(apa )?kabar/i,  
], (payload, chat) => {
  chat.say(`Kabar baik. Bagaimana dengan Anda?`);
});

bot.start(process.env.PORT);
