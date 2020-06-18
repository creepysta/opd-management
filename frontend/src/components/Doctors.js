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

	bookAppointment = async () => {
		const doctor = this.state.currDocId;
		const date = this.dateRef.current.value
		const symptom = this.symptomRef.current.value;
		const query = {
			query:
				`
				mutation {
			  	scheduleAppointment(appointmentInput:{doctor:"${doctor}", symptom:"${symptom}", date: "${date}"}) {
						patient {
							_id
							name
							email
						}
						doctor {
							_id
							department {
								_id
								name
								slots
							}
							name
						}
						department {
							_id
							name
							slots
						}
						date
						symptom
					}
				}
			`
		};
		const body = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.context.token
			},
			body: JSON.stringify(query)
		};
		try {
			const response = await fetch(
				'http://localhost:8000/graphql',
				body
			);
			// console.log(await response.json());
			const result = await response.json();
			// if (result.data && result.data.login) {
			// this.props.history.push('/opd-management/');
			// }
			console.log('Doctors Component');
			console.log(result);
		} catch (err) {
			throw err;
		}
		
		this.setState({
			showModal: false,
		});
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
				{this.state.showModal && <Modal onSubmit={this.bookAppointment} onCancel={this.onCancel}>
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