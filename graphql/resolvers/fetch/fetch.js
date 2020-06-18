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

const getAppointment = async (id) => {
	const appointment = await Appointment.findById(id);
	return {
		...appointment._doc, _id: appointment.id, department: getDepartment.bind(this, appointment.department),
		doctor: getDoctor.bind(this, appointment.doctor), patient: getPatient.bind(this, appointment.patient),
		date: new Date(appointment.date).toISOString()
	};
}

const getAppointments = async (ids) => {
	return ids.map(async id => await getAppointment(id));
}

module.exports = {
	getDepartment: getDepartment,
	getDoctor: getDoctor,
	getPatient: getPatient,
	getAppointment: getAppointment,
	getAppointments: getAppointments,
};