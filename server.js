'use strict';
const BootBot = require('bootbot');
const config = require('config');

/* 
const bot = new BootBot({
  accessToken: 'EAAEIKhtisC4BAD1wjZCEQEEfDgNGP4MBE7vdWEmW5QjwzfirJqT6njnT94BZBw1NjZA79VsUV6ZB6KBoiIWz0tpCfk7rkNsm8swSTPiroUiPWJ8rK8Izan4kDWCJMwRWYJAM6poSzR0zHpYHQdBdIkUOi59x0fcZADTXECmg8f90TivYAbLAp', // process.env.FB_ACCESS_TOKEN,
  verifyToken: 'NGP4MBE7vdWEmW5Qjwzfir', //process.env.FB_VERIFY_TOKEN,
  appSecret: '88930aaa62dad3d81a54c2636e22c9e1' //process.env.FB_APP_SECRET
}); 
*/
const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();


/* 
const express = require(`express`)
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
// app configuration
app.set('port', (process.env.PORT || 3000));
// setup our express application
app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); 
// app routes
require('./routes/webhook_verify')(app);
// warming up the engines !! setta !! go !!!.
app.listen(app.get('port'), function() {
  const url = 'http://localhost:' + app.set('port');
  console.log('Application running on port: ', app.get('port'));
});
 */