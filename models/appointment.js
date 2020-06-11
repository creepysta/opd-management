const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	doctorId: {
		type: Schema.Types.ObjectId,
		ref: 'Doctor'
	},
	patientId: {
		type: Schema.Types.ObjectId,
		ref: 'Patient'
	},
	departmentId: {
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