var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	receiveDate: String,
	receiptDate: String,
	safetyReportId: String,
	companyNumber: String,
	patient: {
		age: String,
		sex: String,
		drugs: [{
			autorizationNumber: String,
			DosageText: String,
			medicinalProduct: String,
			drugIndication: String
		}],
		reactions: [{
			meddraPrimaryTerm: String
		}]
	}
});

module.exports = mongoose.model('events', eventSchema);