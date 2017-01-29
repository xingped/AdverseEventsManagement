// Route /api/drugs
var router = require('express').Router();
var Events = require('../models/events');

router.get('/', function(req, res) {
	Events.distinct('patient.drugs.medicinalProduct', function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;