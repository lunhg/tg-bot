module.exports = function(ctx){
  let cmd = 'commands/help';
  ctx.render(cmd, ['from']).then(function(res){
    ctx.logger.debug(res);
  }).then(function(err){
    console.log(err);
  })
}
