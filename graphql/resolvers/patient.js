const Patient = require('../../models/patient');
const bcrypt = require('bcryptjs');
const { getAppointments } = require('./fetch/fetch');

module.exports = {
	getPatient: async ({id}) => {
		// console.log(id);
		try {
			const patient = await Patient.findById(id);
			if(patient)
				return { ...patient._doc, _id: patient.id, password: null, appointments: getAppointments.bind(this, patient.appointments)};
			else 
				return null;
		}
		catch (err) {
			throw err;
		}
	},
	patients: async () => {
		const patients = await Patient.find();
		return patients.map(patient => {
			return {...patient._doc, _id: patient.id, password: null, appointments: getAppointments.bind(this, patient.appointments)}
		})
	},
	createPatient: async args => {
		console.log(args);
		const dpUrl = args.patientInput.dpUrl ? args.patientInput.dpUrl : 'https://giantbomb1.cbsistatic.com/uploads/scale_medium/2/27436/2722697-gon_freecss_2617.jpg';
		try {
			const checkPatient = await Patient.findOne({email: args.patientInput.email});
			if(checkPatient) {
				console.log(checkPatient);
				throw new Error('Profile already exists. Try logging in');
			}
			const password = await bcrypt.hash(args.patientInput.password, 12)
			const patient = Patient({
				name: args.patientInput.name,
				dpUrl: dpUrl,
				email: args.patientInput.email,		
				age: args.patientInput.age,		
				password: password		
			});
			const result = await patient.save();
			console.log({... result._doc});
			return {...result._doc, _id: result.id};
		} catch(err ) {
			throw err;
		}
	} 
}