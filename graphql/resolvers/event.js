const Event = require('../../models/event');
const User = require('../../models/user');

const getUser = async userId => {
	const user = await User.findById(userId);
	return { ...user._doc, _id: user.id, password: null, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
}

const getEvents = async eventIds => {
	const events = await Event.find({ _id: { $in: eventIds } });
	return events.map(event => { return { ...event._doc, date: new Date(event._doc.date).toISOString(), _id: event.id, createdBy: getUser.bind(this, event.createdBy) } });
}

module.exports = {
	events: async () => {
		try {
			const events = await Event.find();
			// console.log(events);
			return events.map(event => {
				return { ...event._doc, _id: event._doc._id.toString(), createdBy: getUser.bind(this, event._doc.createdBy) };
			});
		}
		catch (err) {
			console.log(err);
			throw err;
		}
	},
	createEvent: async (args, req) => {
		if(!req.isAuth) {
			throw new Error('Unauthenticated!');
		}
		const event = new Event({
			name: args.eventInput.name,
			date: args.eventInput.date,
			createdBy: req.userId
		});
		try {
			const result = await event.save();
			const currUser = await User.findById(result.createdBy);
			currUser.createdEvents.push(result.id);
			// const updatedCreatedEvents = 
			await currUser.save();
			// console.log({...updatedCreatedEvents._doc });
			// console.log(result);
			return { ...result._doc, _id: event.id, createdBy: getUser.bind(this, currUser.id) };
		}
		catch (err) {
			console.log(err);
			throw error;
		}
	},
}