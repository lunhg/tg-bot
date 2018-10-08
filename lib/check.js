
const check = function(req){
  graphql(schema, req.data.body).then(result => {
    if (!result.data.token ) {
      return {
        status: 503,
        messages: [
          'not authorized',
          'token not provided'
        ]
      }
    }
    else {
      let token = atob(result.data.token);
      if (token !== process.env.TOKEN) {
        return {
          status: 503,
          messages: [
            'not authorized',
            'invalid token'
          ]
        }
      }
      else if (token === process.env.TOKEN) {
        return {
          status: 201,
          messages:[
            'authorized',
            {
              name: process.env.NAME,
              domain: process.env.DOMAIN,
              token: process.env.TOKEN
            }
          ]
        }
      }
    }
  });
}
