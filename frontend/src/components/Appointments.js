import React from "react";
// { Component }
import AuthContext from '../context/auth-context';

const Appointments = (props) => {
	// render() {
	// let appointmentList = [];
	// if (this.props.appointments) {
	// 	// console.log(this.context.user.appointments);
	// 	this.props.appointments.forEach(appointment => {
	// 		appointmentList.push(
	// 			<div className=" card appointment-card" key={appointment._id}>
	// 				<div className="doctor">
	// 					<header>
	// 						<h1>{appointment.doctor.name}</h1>
	// 					</header>
	// 					<h2>{appointment.doctor.email}</h2>
	// 					{/* <p>
	// 					</p> */}
	// 					<section className='experience'>
	// 						Experience: {appointment.doctor.experience} years
	// 					</section>
	// 				</div>
	// 				<div className="details">
	// 					<h1>{appointment.date}</h1>
	// 					<h2>{appointment.symptom}</h2>
	// 					<button className="btn submit-btn" onClick={() => this.cancelAppointment(appointment._id)}>Cancel</button>
	// 				</div>
	// 			</div>
	// 		)
	// 	});
	// }
	return (
		<AuthContext.Consumer>
			{
				(context) => {
					return (
						<React.Fragment>
							{/* {(!this.state.user && !this.state.user.appointments) && <div className="appointments"><p>No upcoming appointments</p></div>} */}
							{
								context.user ? context.user.appointments ? (
									<div className="appointments">
										{context.user.appointments.map(appointment => (
											<div className=" card appointment-card" key={appointment._id}>
												<div className="doctor">
													<header>
														<h1>{appointment.doctor.name}</h1>
													</header>
													<h2>{appointment.doctor.email}</h2>
													<section className='experience'>
														Experience: {appointment.doctor.experience} years
												</section>
												</div>
												<div className="details">
													<h1>Due: {appointment.date}</h1>
													<h2>Symptoms: {appointment.symptom}</h2>
													<button className="btn submit-btn" onClick={() => context.cancelAppointment(appointment._id)}>Cancel</button>
												</div>
											</div>
										))}
									</div>) : <div></div> : <div></div>
							}

						</React.Fragment>
					);
				}
			}
		</AuthContext.Consumer>
	)
}

export default Appointments