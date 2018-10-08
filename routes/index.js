const start = require('./start');
const help = require('./help');

module.exports = function () {
    return function(ctx, next){
        if (ctx.message === '/start'){
            return start(ctx).then(next);
        }
        else if (ctx.message === '/help'){
            return help(ctx).then(next);
        }
    }
}
