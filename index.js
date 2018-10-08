const express = require('express');
const app = express();
const bodyParser = require('bodyParser');
const lib = require('./lib');
const tgBot = require('./app');

app.use(bodyParser.json());
app.set('port', 3000);

app.post('/start', function(req, res){
  lib.check(req).then(function(result){
    let status = result.status
    status = status && result.messages.length === 1
    status = status && result.messages[0] === 'authorized'
    if(status){
      let options = result.mesages[1];
      delete result.messages[1];
      return tgBot(options)
    }
  }).then(function(result){
    res.json(result)
  })
});

app.listen(app.get('port'), function(){
  console.log(`===> tg-bot listening at ::${app.get('port')}`);
})
