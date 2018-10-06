module.exports = function(fn){
  return function(ctx, next){
    process.on('unhandledRejection', (reason, p) => {
      let msg = `Unhandled Rejection at: ${p}: ${reason}`;
      ctx.logger.debug(msg);
    });
    return next()
  }
}
