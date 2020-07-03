const Appointment = require('../../models/appointment');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Department = require('../../models/department');
const { getDoctor, getPatient, getDepartment } = require ('./fetch/fetch');

module.exports = {
	appointments: async (args, req) => {
		if(!req.isAuth) {
			throw new Error('Unauthenticated');
		}
		try {
			const appointments = await Appointment.find();
			// if(appointments==null) return [];
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
				await checkAppointment.updateOne({symptom: args.appointmentInput.symptom, date: args.appointmentInput.date})
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
			return { ...result._doc, _id: result.id, date: new Date(result.date).toISOString(), department: getDepartment.bind(this, departmentId), patient: getPatient.bind(this, patientId), doctor: getDoctor.bind(this, args.appointmentInput.doctor) };
		}
		catch (err) {
			throw err;
		}
	},
	cancelAppointment: async (args, req) => {
		if(!req.isAuth) {
			throw new Error('Unauthenticated');
		}
		try {
			const appointmentId = args.appointmentId;
			const cancelledAppointment = await Appointment.findById(appointmentId);
			await Patient.findByIdAndUpdate(cancelledAppointment.patient, { $pullAll: { appointments: [appointmentId] } });
			await Doctor.findByIdAndUpdate(cancelledAppointment.doctor, { $pullAll: { appointments: [appointmentId] } });
			await Appointment.findByIdAndDelete(appointmentId);
			return { ...cancelledAppointment._doc, date: new Date(cancelledAppointment.date).toISOString(), _id: cancelledAppointment.id, doctor: getDoctor.bind(this, cancelledAppointment.doctor), patient: getPatient.bind(this, cancelledAppointment.patient), department: getDepartment.bind(this, cancelledAppointment.department) }
		}
		catch (err) {
			console.log(err);
		}
	}
}