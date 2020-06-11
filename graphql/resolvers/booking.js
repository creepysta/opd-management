const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');


const getUser = async userId => {
	const user = await User.findById(userId);
	return { ...user._doc, _id: user.id, password: null, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
}

const getEvents = async eventIds => {
	const events = await Event.find({ _id: { $in: eventIds } });
	return events.map(event => { return { ...event._doc, date: new Date(event._doc.date).toISOString(), _id: event.id, createdBy: getUser.bind(this, event.createdBy) } });
}

const getSingleEvent = async eventId => {
	const event = await Event.findById(eventId);
	return {...event._doc, _id: event.id, user: getUser.bind(this, event._doc.createdBy)};
}

module.exports = {
	bookings: async () => {
		try {
			const bookings = await Booking.find().populate();
			return bookings.map(booking => { 
				return { ...booking._doc,
								_id: booking.id,
								createdAt: new Date(booking._doc.createdAt).toISOString(),
								updatedAt: new Date(booking._doc.updatedAt).toISOString(), 
								user: getUser.bind(this, booking._doc.user,),
								event: getSingleEvent.bind(this, booking._doc.event)
							} 
			});
		} catch (err) {
			throw err;
		}
	},
	bookBooking: async (args,req) => {
		try {
			if(!req.isAuth) {
				throw new Error('Unauthenticated!');
			}
			const fetchedEvent = await Event.findById(args.eventId);
			// console.log(fetchedEvent);
			const isBooked = await Booking.findOne({user: req.userId, event: fetchedEvent.id});
			if(isBooked) throw new Error('Already booked.');
			const booking = new Booking({
				user: req.userId,
				event: fetchedEvent.id
			});
			const result = await booking.save();
			// console.log(result);
			return { ...result._doc,
							_id: result.id,
							createdAt: new Date(result._doc.createdAt).toISOString(),
							updatedAt: new Date(result._doc.updatedAt).toISOString(),
							user: getUser.bind(this, booking._doc.user,),
							event: getSingleEvent.bind(this, booking._doc.event)
						};
		} catch (err) {
			throw err;
		}
	},
	cancelBooking: async (args,req) => {
		
		if(!req.isAuth) {
			throw new Error('Unauthenticated!');
		}
		try {
			const result = await Booking.findById(args.bookingId);
			console.log(result);
			await Booking.deleteOne({_id: args.eventId});
			return { ...result._doc,
				_id: result.id,
				createdAt: new Date(result._doc.createdAt).toISOString(),
				updatedAt: new Date(result._doc.updatedAt).toISOString(),
				user: getUser.bind(this, result._doc.user,),
				event: getSingleEvent.bind(this, result._doc.event)
			};
		} catch (err) {
			throw err;
		}
	}
};