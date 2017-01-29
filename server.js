var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/semanticbits');

app.use('/api/events', require('./routes/events.js'));
app.use('/api/drugs', require('./routes/drugs.js'));
app.use('/api/reactions', require('./routes/reactions.js'));

app.listen(process.env.PORT || 3000);
module.exports = app;