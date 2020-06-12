const bcrypt = require('bcryptjs');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const Department = require('../../models/department');
const jwt = require('jsonwebtoken');

module.exports = {
	// login: async ({email, password}) => {
	// 	const checkUser = await User.findOne({email: email});
	// 	if(!checkUser) {
	// 		throw new Error('No user exists with this email.');
	// 	}
	// 	const isEqual = await bcrypt.compare(password, checkUser._doc.password);
	// 	if(!isEqual) {
	// 		throw new Error('Password is incorrect.');
	// 	} else {
	// 		const token = jwt.sign({userId: checkUser.id, email: checkUser._doc.email}, 'some_key_for_validation',
	// 		{
	// 			expiresIn: '1h'
	// 		});
	// 		return { userId: checkUser.id, token: token, tokenLife: 1};	
	// 	}
	// }
};