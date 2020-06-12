const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	doctor: {
		type: Schema.Types.ObjectId,
		ref: 'Doctor'
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient'
	},
	department: {
		type: Schema.Types.ObjectId,
		ref: 'Department'
	},
	symptom: {
		type: String,
		required: false
	},
	date: {
		type: Date,
		required: true
	},
	slot: {
		type: Number,
		required: true
	}
}
// ,{timestamps: true}
);
module.exports = mongoose.model('Appointment', appointmentSchema);