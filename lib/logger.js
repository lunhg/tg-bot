const logger = require('winston');

module.exports = function(){
  return function(ctx, next){
    if (!ctx.logger){
      ctx.logger = logger;
    }
    return next()
  }
}
