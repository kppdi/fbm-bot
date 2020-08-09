'use strict';
const BootBot = require('bootbot');
// const config = require('config');
const convoAjuan = require('./convoAjuan');


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
    Nama saya Jamkrida Sulsel. 
    Ketik "help" kalau butuh bantuan ya...`);
})
.hear(['help'], (payload, chat) => {
	chat.say({
		text: 'Apa yang bisa dibantu?',
		buttons: [
			{ type: 'postback', title: 'Kunjungi Website', payload: 'HELP_VISIT_SITE' },
			{ type: 'postback', title: 'Ajukan Surety Bond', payload: 'HELP_AJUAN' }
		]
	});
})
.on('postback', (payload, chat, data) => {
  /* payload: {
    sender: { id: '3165810610162814' },
    recipient: { id: '1294226957325949' },
    timestamp: 1596980247869,
    postback: { title: 'Kunjungi Website', payload: 'HELP_VISIT_SITE' }
  } */

  let kw = payload.postback.payload;
  let title = payload.postback.title;
  // chat.say(title);
  switch (kw){
    case 'HELP_VISIT_SITE':
      break;
    case 'HELP_AJUAN':
      convoAjuan.start(chat);
      break;
  }

})
.hear([
  'hello', 
  'hi', 
  /hey( there)?/i,
  'halo',
  'hallo',
], (payload, chat) => {
  chat.getUserProfile().then((user) => {
    chat.say(`Hi ${user.first_name}! Apa kabar?
      Salam sejahtera dan selamat bergabung.
      Nama saya Jamkrida Sulsel. 
      Ketik "help" kalau butuh bantuan ya...`);
  });
})
.hear([
  /(apa )?kabar/i,  
], (payload, chat) => {
  chat.say(`Kabar baik. Bagaimana dengan Anda?`);
});

bot.start(process.env.PORT);
