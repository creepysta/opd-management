const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const Doctor = require('../../models/doctor');
const Department = require('../../models/department');
const bcrypt = require('bcryptjs');

const getDepartment = async (id) => {
	const department = await Department.findById(id);
	return { ...department._doc, _id: department.id };
}

const getDoctor = async id => {
	const doctor = await Doctor.findById(id);
	return { ...doctor._doc, _id: doctor.id, department: getDepartment.bind(this, doctor.department) };
}

const getPatient = async id => {
	const patient = await Patient.findById(id);
	return { ...patient._doc, _id: patient.id };
}

const getAppointments = async (id) => {
	const appointment = await Appointment.findById(id);
	return {
		...appointment._doc, _id: appointment.id, department: getDepartment.bind(this, appointment.department),
		doctor: getDoctor.bind(this, appointment.doctor), patient: getPatient.bind(this, appointment.patient),
	};
}

module.exports = {
	getDoctor: async (id) => {
		try {
			const doctor = await Doctor.findById(id);
			if (doctor)
				return { ...doctor._doc, _id: doctor.id, password: null, department: getDepartment.bind(this, doctor.department) };
			else
				return null;
		}
		catch (err) {
			throw err;
		}
	},
	doctors: async () => {
		try {
			const doctors = await Doctor.find();
			return doctors.map(doctor => {
				return { ...doctor._doc, _id: doctor.id, password: null, department: getDepartment.bind(this, doctor.department), appointments: doctor.appointments.map(appointment => { console.log(appointment); return getAppointments.bind(this, appointment); }) };
			});
		}
		catch (err) {
			throw err;
		}
	},
	doctorsByName: async ({ name }) => {
		try {
			const doctors = await Doctor.find({ name: { $regex: name, $options: 'i' } });
			return doctors.map(doctor => { return { ...doctor._doc, _id: doctor.id, department: getDepartment.bind(this, doctor.department) } });
		} catch (err) {
			throw err;
		}
	},
	createDoctor: async args => {
		try {
			const dpUrl = args.doctorInput.dpUrl ? args.doctorInput.dpUrl : 'https://giantbomb1.cbsistatic.com/uploads/scale_medium/2/27436/2722697-gon_freecss_2617.jpg';
			console.log(args.doctorInput);
			const password = await bcrypt.hash(args.doctorInput.password, 12);
			const doctor = Doctor({
				name: args.doctorInput.name,
				dpUrl: dpUrl,
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