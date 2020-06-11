const bcrypt = require('bcryptjs');
const Doctor = require('../../models/event');
const Patient = require('../../models/user');
const Appointment = require('../../models/user');
const Department = require('../../models/user');
const jwt = require('jsonwebtoken');


const getUser = async userId => {
	const user = await User.findById(userId);
	return { ...user._doc, _id: user.id, password: null, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
}

const getEvents = async eventIds => {
	const events = await Event.find({ _id: { $in: eventIds } });
	return events.map(event => { return { 
			...event._doc,
			date: new Date(event._doc.date).toISOString(),
			_id: event.id,
			createdBy: getUser.bind(this, event.createdBy) 
		} 
	});
}

module.exports = {
	users: async () => {
		try {
			const users = await User.find();
			console.log(users);
			return users.map(user => {
				return { ...user._doc, password: null, _id: user.id, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
			});
		}
		catch (err) {
			console.log(err);
			throw err;
		}
	},
	createUser: async (args) => {
		var checkUser = await User.findOne({ email: args.userInput.email });
		if (checkUser) {
			throw new Error('User already present.');
		}
		var hashedPassword = await bcrypt.hash(args.userInput.password, 12);
		const user = User({
			email: args.userInput.email,
			password: hashedPassword
		});
		try {
			const result = await user.save();
			console.log(result);
			return { ...result._doc, password: null, _id: user.id };
		}
		catch (err) {
			console.log(err);
			throw err;
		}
	},
	login: async ({email, password}) => {
		const checkUser = await User.findOne({email: email});
		if(!checkUser) {
			throw new Error('No user exists with this email.');
		}
		const isEqual = await bcrypt.compare(password, checkUser._doc.password);
		if(!isEqual) {
			throw new Error('Password is incorrect.');
		} else {
			const token = jwt.sign({userId: checkUser.id, email: checkUser._doc.email}, 'some_key_for_validation',
			{
				expiresIn: '1h'
			});
			return { userId: checkUser.id, token: token, tokenLife: 1};	
		}
	}
};