const Telegraf = require('telegraf');
const session = require('telegraf/session');
const api = require('./api');
const render = require('./render');
const logger = require('./logger')
const start = require('./start');
const help = require('./help');
const errorHandler = require('./error');
// Use telegraf as Express framework
// Middlewares
const telegraf = new Telegraf(process.env.TOKEN);
telegraf.use(logger());
telegraf.catch((err) => {
  let msg = `Error ${err.code}: ${err.message}`;
  console.log(err.stack);
});
telegraf.use(session());
telegraf.use(render());
telegraf.use(api({
  name: 'assistente',
  url: 'https://api.assistente.dev.org.br'
}));
telegraf.use(errorHandler())

// like get, post, etc... in express
telegraf.start(start)
telegraf.help(help);

// Start
telegraf.startPolling(30, 100, null, function(){
  console.log('===> tg- bot stopped');
});
console.log('===> tg-bot v0.0.1 started')
