const Patient = require('../../../models/patient');
const Appointment = require('../../../models/appointment');
const Doctor = require('../../../models/doctor');
const Department = require('../../../models/department');

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
	console.log(appointment);
	return {
		...appointment._doc, _id: appointment.id, department: getDepartment.bind(this, appointment.department),
		doctor: getDoctor.bind(this, appointment.doctor), patient: getPatient.bind(this, appointment.patient),
		date: new Date(appointment.date).toISOString(),
	};
}

module.exports = {
	getDepartment: getDepartment,
	getDoctor: getDoctor,
	getPatient: getPatient,
	getAppointments: getAppointments,
};