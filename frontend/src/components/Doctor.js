import React from "react";
import AuthContext from '../context/auth-context';

const Doctor = (props) => {
	return (
		<AuthContext.Consumer>
			{
				(context) => {
					return (
						<div className="doctor-tile">
							<div className="top-row">
								<div className="tile-dp">
									<img src={props.doctor.dpUrl} alt={props.doctor.name} className="doctor-dp"></img>
								</div>
								<div className="about-doctor">
									<p>Hi I am {props.doctor.name},</p>
									{props.doctor.specializations}
								</div>
								<div className="appointment-btn">
									{/* TODO: context.userId */}
									{context.userId && <button className="btn tile-btn" onClick={() => {
										props.openform(props.doctor._id)
									}}>Book Slot</button>}
								</div>
							</div>
							<hr className="about-qual-div"></hr>
							<div className="doctor-qualifications">
								{props.doctor.email}
							</div>
						</div>
					);
				}
			}
		</AuthContext.Consumer>
	);
}

export default Doctor;