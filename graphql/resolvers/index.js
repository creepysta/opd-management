const authResolver = require('./auth');
const patientResolver = require('./patient');
const doctorResolver = require('./doctor');
const departmentResolver = require('./department');
const appointmentResolver = require('./appointment');

module.exports = {
	...authResolver,
	...patientResolver,
	...doctorResolver,
	...departmentResolver,
	...appointmentResolver
}