module.exports = function(ctx){
  let cmd = 'commands/start';
  ctx.render(cmd, ['from']).then(function(res){
    ctx.logger.debug(res);
  }).catch(function(err){
    console.log(err)
  })
}
