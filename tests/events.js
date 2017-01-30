var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Events API', function() {
	it('should return some events', function(done) {
		chai.request(server)
			.get('/api/events')
			.end(function(err, resp) {
				resp.should.have.status(200);
				resp.should.be.json;
				resp.body.should.be.a('array');
				resp.body[0].should.have.property('_id');
				resp.body[0].should.have.property('receiveDate');
				resp.body[0].should.have.property('receiptDate');
				resp.body[0].should.have.property('safetyReportId');
				resp.body[0].should.have.property('companyNumber');
				resp.body[0].patient.should.be.a('object');
				resp.body[0].patient.should.have.property('age');
				resp.body[0].patient.should.have.property('sex');
				resp.body[0].patient.drugs.should.be.a('array');
				resp.body[0].patient.reaction.should.be.a('array');
				done();
			});
	});

	var newId = null;
	it('should create a new event', function(done) {
		chai.request(server)
			.put('/api/events/')
			.send({'receiveDate': '20160101', 'patient': {'sex': 1, 'age': 'unknown'}})
			.end(function(err, resp) {
				resp.should.have.status(200);
				resp.should.be.json;
				resp.body.should.be.a('object');
				resp.body.should.have.property('_id');
				resp.body.should.have.property('receiveDate');
				resp.body.should.have.property('receiptDate');
				resp.body.should.have.property('safetyReportId');
				resp.body.should.have.property('companyNumber');
				resp.body.patient.should.be.a('object');
				resp.body.patient.should.have.property('age');
				resp.body.patient.should.have.property('sex');
				resp.body.patient.drugs.should.be.a('array');
				resp.body.patient.reaction.should.be.a('array');
				resp.body.receiveDate.should.equal('20160101');

				newId = resp.body._id;

				done();
			});
	});

	it('should modify an event', function(done) {
		chai.request(server)
			.post('/api/events/'+newId)
			.send({'receiveDate': '20171212', 'patient': {'sex': 2, 'age': 'unknown'}})
			.end(function(err, resp) {
				resp.should.have.status(200);
				resp.should.be.json;
				resp.body.should.be.a('object');
				resp.body.should.have.property('_id');
				resp.body.should.have.property('receiveDate');
				resp.body.should.have.property('receiptDate');
				resp.body.should.have.property('safetyReportId');
				resp.body.should.have.property('companyNumber');
				resp.body.patient.should.be.a('object');
				resp.body.patient.should.have.property('age');
				resp.body.patient.should.have.property('sex');
				resp.body.patient.drugs.should.be.a('array');
				resp.body.patient.reaction.should.be.a('array');
				resp.body.receiveDate.should.equal('20171212');
				done();
			});
	});

	it('should delete an event', function(done) {
		chai.request(server)
			.delete('/api/events/'+newId)
			.end(function(err, resp) {
				resp.should.have.status(200);
				done();
			});
	});
});