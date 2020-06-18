import React, { Component } from "react";
import Doctor from './Doctor';
import Backdrop from './modal/backdrop';
import Modal from './modal/modal';
import AuthContext from "../context/auth-context";

class Doctors extends Component {

	state = {
		doctors: [],
		showModal: false,
		currDocId: null,
	};

	constructor(props) {
		super(props);
		this.docNameRef = React.createRef();
		this.symptomRef = React.createRef();
		this.dateRef = React.createRef();
	}

	static contextType = AuthContext;

	openform = (currId) => {
		this.setState({
			showModal: true,
			currDocId: currId
		})
	}

	
	onCancel = () => {
		this.setState({
			showModal: false
		});
	}

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
			<Doctor doctor={doctor} openform={this.openform} key={doctor._id} />
		));
		return (
			<div className="doctor">
				<div className="search-form">
					<p><input className='search-field' type="text" name="search-name" placeholder='Search by name' ref={this.docNameRef} /></p>
					<button className='btn submit-btn' onClick={this.handleSearch}>Search</button>
				</div>
				{this.state.showModal && <Backdrop />}
				{this.state.showModal && <Modal onSubmit={() => {this.context.bookAppointment(this.state.currDocId, this.dateRef.current.value,this.symptomRef.current.value);}} onCancel={this.onCancel}>
					<div className="modal-form">
						<div className="form-fields">
							<label htmlFor='symptom'>Symptoms:</label>
							<textarea rows='4' ref={this.symptomRef} />
						</div>
						<div className="form-fields">
							<label htmlFor='date'>Date:</label>
							<input type='datetime-local' ref={this.dateRef}></input>
						</div>
					</div>
				</Modal>}
				<div className="display-container">
					{dispList}
					{/* {
						this.state.doctors.map((doctor) => (
							<Doctor doctor={doctor} openform={this.openForm} key={doctor._id} />
						))
					} */}
				</div>
			</div>
		);
	}
}

export default Doctors