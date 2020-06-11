import React from "react";

const Doctor = ({doctor}) => {
	return (
		<div className="doctor-tile">
			<div className="top-row">
				<div className="tile-dp">
					<img src={doctor.avatar} alt={doctor.name} className="doctor-dp"></img>
				</div>
				<div className="about-doctor">
				<p>Hi I am {doctor.name},</p>
					{doctor.about}
				</div>
				<div className="appointment-btn">
					<button className="btn tile-btn">Book Slot</button>
				</div>
			</div>
			<hr className="about-qual-div"></hr>
			<div className="doctor-qualifications">
				{doctor.qualifications}
			</div>
		</div>
	)
}

export default Doctor;