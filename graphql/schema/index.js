const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Appointment {
	_id: ID!
	doctorId: Doctor!
	patientId: Patient!
	departmentId: Department!
	date: String!
	slot: Int!
}

input AppointmentInput {
	doctorId: String!
	date: String!
}

type Patient {
	_id: ID!
	name: String!
	email: String!
	age: Int!
	password: String
	appointments: [Appointment!]
}

type Doctor {
	_id: ID!
	name: String!
	email: String!
	password: String
	experience: Int!
	qualifications: [String!]
	departments: [Department!]!
	appointments: [Appointment!]
	specialization: String!
}

input UserInput {
	email: String!
	password: String
}

type Auth {
	userId: ID!
	token: String!
	tokenLife: Int!
}

type RootQuery {
	doctors: [Doctor!]!
	login(email: String!, password: String!): Auth
}

type RootMutation {
	createEvent(eventInput: EventInput): Event
	createUser(userInput: UserInput): User
	scheduleAppointment(eventId: ID!): Appointment!
	cancelAppointment(bookingId: ID!): Appointment!
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`);