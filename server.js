'use strict';
const BootBot = require('bootbot');
// const config = require('config');


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
console.log('Started...');


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