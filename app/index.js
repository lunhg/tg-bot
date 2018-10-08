// control the bot from a simple api
const atob = require('atob');
const graphqlHTTP = require('express-graphql');
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
  telegraf.use(errorHandler())

  // Start
  return new Promise(function(resolve, reject){
    resolve(telegraf);
  })
}
