var express = require('express')
var app = express()
var path = require('path')

app.set('port',( process.env.PORT || 5000 ))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/html/graph.html'));
})

app.listen(app.get('port'), function () {
  console.log('HackTech visualization running on port ' + app.get('port'));
})