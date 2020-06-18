const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Appointment {
	_id: ID!
	doctor: Doctor!
	patient: Patient!
	department: Department!
	symptom: String
	date: String!
	slot: Int!
}

input AppointmentInput {
	doctor: String!
	symptom: String
	date: String!
}

type Patient {
	_id: ID!
	name: String!
	dpUrl: String
	email: String!
	age: Int!
	password: String
	appointments: [Appointment!]!
}

input PatientInput {
	name: String!
	dpUrl: String
	email: String!
	age: Int!
	password: String
}

type Doctor {
	_id: ID!
	name: String!
	dpUrl: String
	email: String!
	password: String
	experience: Int!
	qualifications: [String!]
	department: Department!
	appointments: [Appointment!]!
	specializations: [String!]
}

input DoctorInput {
	name: String!
	dpUrl: String
	email: String!
	password: String
	experience: Int!
	qualifications: [String!]
	department: String!
	specializations: [String!]
}

type Department {
	_id: ID!
	name: String!
	doctorsCount: Int!
	slots: Int!
	remainingSlots: Int!
}

input DepartmentInput {
	name: String!
	slots: Int!
}

type Auth {
	userId: ID!
	token: String!
	tokenLife: Int!
}

type RootQuery {
	doctors: [Doctor!]!
	doctorsByName(name: String!) : [Doctor!]!
	patients: [Patient!]!
	getPatient(id: String!) : Patient
	getDoctor(id: String!) : Doctor
	departments: [Department!]!
	appointments: [Appointment!]!
	login(email: String!, password: String!, userType: Int!): Auth
}

type RootMutation {
	createPatient(patientInput: PatientInput): Patient!
	createDoctor(doctorInput: DoctorInput): Doctor!
	createDepartment(departmentInput: DepartmentInput): Department!
	scheduleAppointment(appointmentInput: AppointmentInput): Appointment!
	cancelAppointment(appointmentId: ID!): Appointment!
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`);