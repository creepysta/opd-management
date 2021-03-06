const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	dpUrl: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	experience: {
		type: Number,
		required: true,
	},
	qualifications: [
		{
			type: String,
			required: false
		}
	],
	department: {
		type: Schema.Types.ObjectId,
		ref: 'Department'
	},
	specializations: [
		{
			type: String,
			required: false
		},
	],
	appointments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Appointment'
		}
	]
});
// ,{ timestamps: true }
	
module.exports = mongoose.model('Doctor', doctorSchema);