class Service {

  constructor(){
    this.methods = {};
  }

  register (name, options) {
    this.methods[name] = this.methods[name] ? this.methods[name] : {};
    this.methods[name].url = options.url;
    let __req__ = (method, url, req) => {
      options.logger.debug(`${method} ${url}`);
      return axios({
        method: method,
        headers: req.headers,
        data: req.data,
        url: url
      });
    }
    this.methods[name][`create`] = function (req) {
      let url = `${this.methods[name].url}/${name}s`
      return __req__('POST', url, req) 
    };
    this.methods[name][`getAll`] = function (req) {
      let url = `${this.methods[name].url}/${name}s`
      return __req__('GET', url, req)
    };
    this.methods[name][`get`] = function (req) {
      let url = `${this.methods[name].url}/${name}s/${req.id}`
      return __req__('GET', url, req);
    };
    this.methods[name][`put`] = function (req) {
      let url = `${this.methods[name].url}/${name}s/${req.id}`;
      return __req__('PUT', url, req)
    };
    this.methods[name][`update`] = function (req) {
      let url = `${this[name].url}/${name}s/${req.id}`
      return __req__('UPDATE', url, req);
    };
    this.methods[name][`delete`] = function (id) {
      let url = `${this.methods[name].url}/${name}s/${req.id}`
      return __req__('DELETE', url, req);
    };
  }
}

let service = new Service();

module.exports = function ({name, url}){
  return function(ctx, next) {
    if (!ctx.service){
      if(!service.methods[name]){
          service.register(name, {url: url, logger: ctx.logger});
      }
      ctx.service = function(n){
        return service.methods[n];
      }
    }
    return next();
  }
}
