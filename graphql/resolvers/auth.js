const bcrypt = require('bcryptjs');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const Department = require('../../models/department');
const jwt = require('jsonwebtoken');

module.exports = {
	login: async ({email, password, userType}) => {
		checkUser = null;
		if(userType===1) {
			checkUser = await Doctor.findOne({email: email});
		} else {
			checkUser = await Patient.findOne({email: email});
		}
		if(!checkUser) {
			throw new Error('No user exists with this email.');
		}
		const isEqual = await bcrypt.compare(password, checkUser._doc.password);
		if(!isEqual) {
			throw new Error('Password is incorrect.');
		} else {
			const token = jwt.sign({userId: checkUser.id, email: checkUser._doc.email}, 'some_key_for_validation',
			{
				expiresIn: '500h'
			});
			return { userId: checkUser.id, token: token, tokenLife: 500};	
		}
	}
};