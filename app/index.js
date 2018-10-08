// control the bot from a simple api
const atob = require('atob');
const lib = require('../lib');
const routes = require('../routes');
const Telegraf = require('telegraf');
const session = require('telegraf/session');

module.exports = function(options){
  const telegraf = new Telegraf(options.token);
  telegraf.use(lib.logger());
  telegraf.catch(lib.error());
  telegraf.use(session());
  telegraf.use(lib.render());
  telegraf.use(lib.api({
    name: options.name,
    url: options.url
  }));
  telegraf.use(lib.errorHandler())
  telegraf.user(lib.routes())
  // Start
  return new Promise(function(resolve, reject){
    telegraf.startPolling(30, 100, function(){
      console.log('==> telegraf stopped')
    })
    resolve()
  })
}
