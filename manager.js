const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const logger = require('winston');
const axios = require('axios');
const session = require('telegraf/session');
const util = require('./util');

// The bot will be managed by an manager, defined by the yaml files
class TelegrafManager {

  constructor (options) {
    this.telegraf = options.telegraf;
    this.telegraf.api_url = options.api
    
    this.manager = manager;
    this.telegraf.use(session());
    this.telegraf.use(util())
    this.telegraf.use(api({

    }, function({started, data}){
        logger.debug(`Message sent from ${data.telegramId}`);
    }, function(err){

    }));

    this.telegraf.catch((err) => {
      let msg = `Error ${err.code}: ${err.message}`;
      logger.error(msg);
    });

    this.telegraf.start((ctx) => {
      let parsed = this.get('start', ctx);
      ctx.reply(parsed);
    });

    this.telegraf.help((ctx) => {
      let parsed = this.get('help', ctx);      
      ctx.reply(parsed.value);
    })

    Object.keys(this.manager).forEach(command => {
      this.telegraf.command(command, (ctx) => {
        let parsed = this.get(command, ctx);
        ctx.reply(parsed);
      });
    });

    Object.keys(this.hears).forEach(hear => {
      this.telegraf.hears(hear, (ctx) => {
        let parsed = this.get(command, ctx);
        ctx.reply(parsed);
      });
    });
  }

  get(command, ctx) {
    let command = this.manager[command];
    Object.keys(ctx).forEach(function(k){
      let t = ctx[k].value;
      t.forEach(function(item){
        if (typeof item === 'string'){
          item.replace('{{'+k+'}}', k);        
        }
      });
    });
    return command;
  }

  start (callback) {
    this.telegraf.startPolling(30, 100, null, () => {
      logger.debug('tg-bot stoped polling');
    });
    logger.debug('tg-bot start polling');
  }
}

module.exports = TelegrafManager;
