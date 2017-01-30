var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	receiveDate: {
		type: String,
		default: ''
	},
	receiptDate: {
		type: String,
		default: ''
	},
	safetyReportId: {
		type: String,
		default: ''
	},
	companyNumber: {
		type: String,
		default: ''
	},
	patient: {
		age: {
			type: String,
			default: ''
		},
		sex: {
			type: String,
			default: ''
		},
		drugs: [{
			autorizationNumber: {
				type: String,
				default: ''
			},
			DosageText: {
				type: String,
				default: ''
			},
			medicinalProduct: {
				type: String,
				default: ''
			},
			drugIndication: {
				type: String,
				default: ''
			}
		}],
		reaction: [{
			meddraPrimaryTerm: {
				type: String,
				default: ''
			}
		}]
	}
});

module.exports = mongoose.model('events', eventSchema);