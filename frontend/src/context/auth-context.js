import React from 'react';

export default React.createContext({
	token: null,
	userId: null,
	tokenLife: null,
	userType: null,
	user: null,
	// TODO: async
	login: async (token, userId, tokenLife, userType) => {},
	logout: () => {},
	bookAppointment: async (date, symptom) => {},
	cancelAppointment: async (id) => {} 
});