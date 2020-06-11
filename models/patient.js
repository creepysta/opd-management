const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	appointments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Appointment'
		}
	]
});

module.exports = mongoose.model('Patient', patientSchema);