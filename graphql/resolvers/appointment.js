const Appointment = require('../../models/appointment');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Department = require('../../models/department');

const getDoctor = async id => {
	const doctor = await Doctor.findById(id);
	return { ...doctor._doc, _id: doctor.id, department: getDepartment.bind(this, doctor.department) };
}

const getDepartment = async id => {
	const department = await Department.findById(id);
	return { ...department._doc, _id: department.id };
}

const getPatient = async id => {
	const patient = await Patient.findById(id);
	return { ...patient._doc, _id: patient.id };
}

module.exports = {
	appointments: async () => {
		try {
			const appointments = await Appointment.find();
			return appointments.map(appointment => {
				return {
					...appointment._doc, _id: appointment.id, date: new Date(appointment.date).toISOString(), patient: getPatient.bind(this, appointment.patient),
					doctor: getDoctor.bind(this, appointment.doctor), department: getDepartment.bind(this, appointment.department)
				};
			});
		}
		catch (err) {
			throw err;
		}
	},
	scheduleAppointment: async (args, req) => {
		if(!req.isAuth) {
			throw new Error('Unauthenticated');
		} 
		try {
			const patientId = req.userId;
			const patient = await Patient.findById(patientId);
			const doctor = await Doctor.findById(args.appointmentInput.doctor);
			const checkAppointment = await Appointment.findOne({ patient: patientId, doctor: doctor.id });
			const departmentId = (await Department.findById(doctor.department)).id;
			if (checkAppointment) {
				return { ...checkAppointment._doc, _id: checkAppointment.id, date: new Date(checkAppointment.date).toISOString(), department: getDepartment.bind(this, departmentId), patient: getPatient.bind(this, patientId), doctor: getDoctor.bind(this, args.appointmentInput.doctor) };
			}
			console.log(departmentId);
			const appointment = Appointment({
				doctor: args.appointmentInput.doctor,
				patient: patientId,
				department: departmentId,
				symptom: args.appointmentInput.symptom,
				date: args.appointmentInput.date,
				slot: 1
			});
			const result = await appointment.save();
			patient.appointments.push(result.id);
			// console.log(patient._doc.appointments)
			await patient.save();
			doctor.appointments.push(result.id);
			// console.log(doctor._doc.appointments)
			await doctor.save();
			return { ...result._doc, _id: result.id, date: new Date(cancelledAppointment.date).toISOString(), department: getDepartment.bind(this, departmentId), patient: getPatient.bind(this, patientId), doctor: getDoctor.bind(this, args.appointmentInput.doctor) };
		}
		catch (err) {
			throw err;
		}
	},
	cancelAppointment: async ({ appointmentId }) => {
		const cancelledAppointment = await Appointment.findById(appointmentId);
		await Patient.findByIdAndUpdate(cancelledAppointment.patient, { $pullAll: { appointments: [appointmentId] } });
		await Doctor.findByIdAndUpdate(cancelledAppointment.doctor, { $pullAll: { appointments: [appointmentId] } });
		await Appointment.findByIdAndDelete(appointmentId);
		return { ...cancelledAppointment._doc, date: new Date(cancelledAppointment.date).toISOString(), _id: cancelledAppointment.id, doctor: getDoctor.bind(this, cancelledAppointment.doctor), patient: getPatient.bind(this, cancelledAppointment.patient), department: getDepartment.bind(this, cancelledAppointment.department) }
	}
}