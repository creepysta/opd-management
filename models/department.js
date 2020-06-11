const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = Schema({
	name: {
		type: String,
		required: true
	},
	doctorsCount: {
		type: Number,
		required: true
	},
	slots: {
		type: Number, 
		required: true
	},
	remainingSlots: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Department', departmentSchema);