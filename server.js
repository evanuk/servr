var path = require('path')

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config');
var apiRouter = require('./app/routes/api')(app, express);
var userRouter = require('./app/routes/user')(app, express);
var authRouter = require('./app/routes/authenticate')(app, express);

mongoose.connect(config.database);

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//configure our app to handle CORS requests
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
})

app.use(express.static(__dirname + '/public'));
app.use('/api/authenticate', authRouter);

app.use('/api/users', userRouter);
app.use('/api', apiRouter);

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Listening on port ' + config.port);
