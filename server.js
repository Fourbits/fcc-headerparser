var express = require('express')
var app = express()
var port = process.env.PORT || 8080;
var ip = process.env.IP || '127.0.0.1';

app.get('/', function(req, res){
  var out = {}
  out.ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  var comma = req.headers['accept-language'].indexOf(',')
  if (comma == -1){
    out.language = req.headers['accept-language']
  } else {
    out.language = req.headers['accept-language'].substr(0,comma)
  }
  var open = req.headers['user-agent'].indexOf('(')
  var close = req.headers['user-agent'].indexOf(')')
  out.software = req.headers['user-agent'].substring(open+1,close)
  console.log('===New header===')
  console.log(req.headers);
  console.log('--- Sent out ---')
  console.log(out)
  console.log('')
  res.send(out)
})

app.listen(port)