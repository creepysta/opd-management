import React from "react";
import AuthContext from '../context/auth-context';

const Doctor = ({ doctor, bookAppointment }) => (
	<AuthContext.Consumer>
		{
			(context) => {
				return (
					<div className="doctor-tile">
						<div className="top-row">
							<div className="tile-dp">
								<img src={doctor.dpUrl} alt={doctor.name} className="doctor-dp"></img>
							</div>
							<div className="about-doctor">
								<p>Hi I am {doctor.name},</p>
								{doctor.specializations}
							</div>
							<div className="appointment-btn">
								{/* TODO: context.userId */}
								{ 1 && <button className="btn tile-btn" onClick={() => {
									bookAppointment(doctor._id)
								}}>Book Slot</button>}
							</div>
						</div>
						<hr className="about-qual-div"></hr>
						<div className="doctor-qualifications">
							{doctor.email}
						</div>
					</div>
				);
			}
		}
	</AuthContext.Consumer>
)

export default Doctor;