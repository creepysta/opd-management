import React, { Component } from "react";
import Doctor from './Doctor';

class Doctors extends Component {
	state = {
		doctors: [{
			id: Math.random(),
			avatar: 'D:\\Pictures\\Saved Pictures\\bot.png',
			name: 'Dr. Shetty',
			about: 'Heart Surgeon. I am the one the one the one!! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi eligendi autem, fugit expedita recusandae culpa minus molestias sit maiores ratione at totam placeat magnam maxime facilis dolore id pariatur iusto.',
			qualifications: 'Lorem Ipsum'
		},
		{
			id: Math.random(),
			avatar: 'D:\\Pictures\\Saved Pictures\\bot.png',
			name: 'Dr. Snoop Dogg',
			about: 'The ans to Universe and Everything is Weed',
			qualifications: 'My face is crafted on the Mt. Rushmore of smoking pot.'
		}],
	};

	handleSubmit = (event) => {
		event.preventDefault();
	}

	handleSearch = (event) => {
		console.log(event.target.value);
		// do database query fetch doctors
		// store in doctors and set the list in state
		// let doctors = [];
		// this.setState({
		// 	doctors: doctors
		// })
	}

	render() {
		let dispList = [];
		this.state.doctors.forEach((doctor) => dispList.push(
			<Doctor doctor={doctor} key={doctor.id}/>
		));
		return (
			<div className="doctor">
				<div className="search-form">
					<form onSubmit={this.handleSubmit} className="search doctor-name">
						<p><input className='search-field' type="text" name="search-name" placeholder='Search by name' onChange={this.handleSearch}/></p>
						<input className='btn submit-btn' type="submit" value="Search"/>
					</form>
				</div>
				<div className="display-container">
					{dispList}
				</div>
			</div>
		);
	}
}

export default Doctors