import React, { Component } from "react";
import Doctor from './Doctor';

class Doctors extends Component {

	constructor(props) {
		super(props);
		this.docNameRef = React.createRef();
	}

	state = {
		doctors: [],
	};

	handleSearch = async () => {
		const name = this.docNameRef.current.value;
		const query = {
			query: 
			`
			query{
				doctorsByName(name: "${name}") {
					_id
					name
					department {
						name
					}
					email
					specializations
					dpUrl
					experience
					appointments {
						_id
						symptom
					}
				}
			}
			`
		};
		const body = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(query)
		};
		try {
			const response = await fetch(
				'http://localhost:8000/graphql',
				body
			);
			// if(response.status === 200) console.log('Success');
			// console.log(await response.json());
			const result = await response.json();
			this.setState({
				doctors: [...result.data.doctorsByName]
			})
			// console.log(this.state);
		}
		catch (err) {
			throw err;
		}
	}

	render() {
		let dispList = [];
		this.state.doctors.forEach((doctor) => dispList.push(
			<Doctor doctor={doctor} key={doctor._id} />
		));
		return (
			<div className="doctor">
				<div className="search-form">
					<p><input className='search-field' type="text" name="search-name" placeholder='Search by name' ref={this.docNameRef} /></p>
					<button className='btn submit-btn' onClick={this.handleSearch}>Search</button>
				</div>
				<div className="display-container">
					{dispList}
				</div>
			</div>
		);
	}
}

export default Doctors