const Doctor = require('../../models/doctor');
const Department = require('../../models/department');
const bcrypt = require('bcryptjs');


const getDepartment = async id => {
	const department = await Department.findById(id);
	return { ...department._doc, _id: department.id};
}

module.exports = {
	doctors: async () => {
		try {
			const doctors = await Doctor.find();
			return doctors.map(doctor => {
				return { ...doctor._doc, _id: doctor.id, password: null, department: getDepartment.bind(this, doctor.department) };
			});
		}
		catch (err) {
			throw err;
		}
	},
	createDoctor: async args => {
		try {
			console.log(args.doctorInput);
			const password = await bcrypt.hash(args.doctorInput.password, 12);
			const doctor = Doctor({
				name: args.doctorInput.name,
				email: args.doctorInput.email,
				password: password,
				experience: args.doctorInput.experience,
				qualifications: args.doctorInput.qualifications,
				department: args.doctorInput.department,
				specializations: args.doctorInput.specializations,
			});
			const result = await doctor.save();
			console.log({ ...result._doc });
			return { ...result._doc, _id: result.id, password: null, department: getDepartment.bind(this, args.doctorInput.department) };
		}
		catch (err) {
			throw err;
		}
	}
}