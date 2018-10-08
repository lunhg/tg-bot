const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let template = function(f){
  return new Promise(function(resolve, reject){
    let p = path.join(__dirname, `${f}.yml`);
    fs.readFile(p, 'utf8', function(err, data){
      if(err) reject(err);
      resolve(yaml.safeLoad(data));
    })
  })
};

let envir = function(t, env, regexp){
  return t.messages.map(function(msg){
    return {
      value: msg.value.replace(regexp,(org, v) => {
        return env[v] ? env[v] : org;
	    }),
      extra: msg.extra
    }
  });
};

let parse = function(template, data, filter){
  return Promise.all(filter.map(function(key){
    if(data[key]){
      return new Promise(function(resolve, reject){
        let regexp = /\${(\w+)}/g;
        let env = Object.assign({}, data[key]);
        resolve(envir(template,
                      env,
                      regexp));
      });
    }
  }));
};

const render = function(cmd, ctx, filter){
  return template(cmd).then(function(t){
    return parse(t, ctx, filter)
  }).then(function(res){
    let id = ctx.chat.id;
    return Promise.all(res.map(function(msg){
      return ctx.telegram.sendMessage(id,
                                      msg[0].value,
                                      msg[0].extra);
    }));
  });
};
module.exports = function(){
  return function(ctx, next){
    ctx.render = function(cmd, filter){
      ctx.logger.debug(`Received attempting ${cmd} from ${ctx.chat.id}`);
      return render(cmd, ctx, filter);
    };
    return next()
  }
}
