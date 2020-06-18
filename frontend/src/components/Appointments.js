import React, { Component } from "react";
import AuthContext from '../context/auth-context';

class Appointments extends Component {
	state = {
		showModal: false,
	}

	static contextType = AuthContext;

	cancelAppointment = async (id) => {
		const query = {
			query : 
			`
				mutation {
					cancelAppointment(appointmentId:"${id}") {
						_id
						date
						patient {
							name
						}
						doctor {
							name
						}
					}
				}
			`
		};
		const body = {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
				'Authorization': 'Bearer ' + this.context.token, 
			},
			body: JSON.stringify(query),
		}
		const response = await fetch('http://localhost:8000/graphql', body);
		if(response.status === 200) console.log('Sucess');
		else console.log('Failed');
		const data = await response.json();
		console.log(data);
	}

	render() {
		let appointmentList = [];
		if (this.context.user) {
			// console.log(this.context.user.appointments);
			this.context.user.appointments.forEach(appointment => {
				appointmentList.push(
					<div className=" card appointment-card" key={appointment._id}>
						<div className="doctor">
							<header>
								<h1>{appointment.doctor.name}</h1>
							</header>
							<h2>{appointment.doctor.email}</h2>
							{/* <p>
							</p> */}
							<section className='experience'>
								Experience: {appointment.doctor.experience}
							</section>
						</div>
						<div className="details">
							<h1>{appointment.date}</h1>
							<h2>{appointment.symptom}</h2>
							<button onClick={this.cancelAppointment}>Cancel</button>
						</div>
					</div>
				)
			});
		}
		return (
			<React.Fragment>
				{(!this.state.user || this.state.user.appointments) && <div className="appointments"><p>No upcoming appointments</p></div>}
				{this.context.user && this.context.user.appointments &&
					<div className="appointments">
						{appointmentList}
					</div>}

			</React.Fragment>
		)
	}
}

export default Appointments