import React, { Component } from 'react';
import Modal from './modal/modal';
import Backdrop from './modal/backdrop';
import AuthContext from '../context/auth-context';

class Register extends Component {
	state = {
		userType: 0,
		showModal: false,
	};
	constructor(props) {
		super(props);
		this.nameRef = React.createRef();
		this.loginEmailRef = React.createRef();
		this.emailRef = React.createRef();
		this.dpRef = React.createRef();
		this.ageRef = React.createRef();
		this.loginPasswordRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
	}
	static contextType = AuthContext;

	register = () => {
		this.setState({ showModal: true });
	}

	proceedRegistration = async () => {
		const name = this.nameRef.current.value;
		const email = this.emailRef.current.value;
		const dpUrl = this.dpRef.current.value;
		const age = +this.ageRef.current.value;
		const password = this.passwordRef.current.value;
		// const confirmPassword = this.confirmPasswordRef.current.value;
		// if(password !== confirmPassword) {

		// }
		const query = {
			query: `
			mutation {
			  createPatient(patientInput:{name:"${name}", age: ${age}, email:"${email}", password:"${password}", dpUrl: "${dpUrl}"}) {
					_id
			  }
			}
			`
		}
		const requestBody = {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(query)
		}
		try {
			const response = await fetch('http://localhost:8000/graphql', requestBody);
			if (response.status === 200) {
				console.log('Sucess');
				const data = await response.json();
				console.log(data);
			} else {
				console.log('Failed');
			}
		} catch (err) {
			throw err
		}
		this.setState({ showModal: false });
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	changeUser = () => {
		const currUser = 1 - this.state.userType;
		this.setState({
			userType: currUser
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const email = this.loginEmailRef.current.value;
		const password = this.loginPasswordRef.current.value;
		const userType = +this.state.userType;
		const query = {
			query: `
				query {
			  	login(email:"${email}", password: "${password}", userType: ${userType}) {
			    	userId
			    	token
			    	tokenLife
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
			// console.log(await response.json());
			const result = await response.json();
			if (result.data && result.data.login) {
				this.context.login(
					result.data.login.token,
					result.data.login.userId,
					result.data.login.tokenLife,
					this.state.userType
				);
				this.props.history.replace('/opd-management/');
			}
		} catch (err) {
			throw err;
		}
	}

	// name: String!
	// dpUrl: String
	// email: String!
	// age: Int!
	// password: String
	render() {
		return (
			<div className='authform-container'>
				{this.state.showModal && <Backdrop />}
				{this.state.showModal &&
					<Modal onCancel={this.closeModal} onSubmit={this.proceedRegistration} title={"Registration"}>
						<div className="modal-form">
							<div className="form-fields">
								<label htmlFor="name">Name:</label>
								<input type="text" ref={this.nameRef}></input>
							</div>
							<div className="form-fields">
								<label htmlFor="email">Email:</label>
								<input type="email" ref={this.emailRef}></input>
							</div>
							<div className="form-fields">
								<label htmlFor="dp">Profile Pic:</label>
								<input type="text" ref={this.dpRef}></input>
							</div>
							<div className="form-fields">
								<label htmlFor="age">Age:</label>
								<input type="number" ref={this.ageRef}></input>
							</div>
							<div className="form-fields">
								<label htmlFor="password">Password:</label>
								<input type="password" ref={this.passwordRef}></input>
							</div>
							{/* <div className="form-fields">
								<label htmlFor="confirm-password">Confirm Password:</label>
								<input type="password" ref={this.confirmPasswordRef}></input>
							</div> */}
						</div>
					</Modal>
				}
				<div className="auth-form">
					<form onSubmit={this.handleSubmit}>
						<div className="form-fields">
							<label htmlFor='email'>Email:</label>
							<input type='email' id='email' ref={this.loginEmailRef}></input>
						</div>
						<div className="form-fields">
							<label htmlFor='email'>Password:</label>
							<input type='password' id='password' ref={this.loginPasswordRef}></input>
						</div>
						<div className="form-actions">
							<button type='button' onClick={this.register}>Register</button>
							<button type='button' onClick={this.changeUser}>Sign in as a {this.state.userType ? "Doctor" : "Patient"}</button>
							<button type='submit'>Submit</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Register;