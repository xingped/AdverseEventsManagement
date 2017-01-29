// Route /api/reactions
var router = require('express').Router();
var Events = require('../models/events');

router.get('/', function(req, res) {
	Events.distinct('patient.reaction', function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;