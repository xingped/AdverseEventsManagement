// Route /api/events
var router = require('express').Router();
var Events = require('../models/events');

router.get('/', function(req, res) {
	var page = parseInt(req.query.page);
	Events.find({}).skip(page).limit(10).exec(function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

router.put('/', function(req, res) {
	Events.create(req.body, function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

router.post('/:id', function(req, res) {
	Events.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

router.delete('/:id', function(req, res) {
	Events.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send();
		}
	});
});

module.exports = router;