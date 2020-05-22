import React from "react";

const Doctor = ({doctor}) => {
	return (
		<div className="doctor-tile">
			<div className="doctor-dp tile-dp">
				<img src={doctor.avatar} alt={doctor.name}></img>
			</div>
			<div className="about-doctor">
				{doctor.about}
			</div>
			<hr className="about-qual-div"></hr>
			<div className="doctor-qualifications">
				{doctor.qualifications}
			</div>
			<div className="appointment-btn">
				<button className="btn tile-btn">Book Slot</button>
			</div>
		</div>
	)
}

export default Doctor;