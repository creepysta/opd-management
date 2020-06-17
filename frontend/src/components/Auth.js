import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

class Register extends Component {
	state = {
		userType: 0
	};
	constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
	}
	static contextType = AuthContext;

	changeUser = () => {
		const currUser = 1 - this.state.userType;
		this.setState({
			userType: currUser
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const email = this.emailRef.current.value;
		const password = this.passwordRef.current.value;
		const userType = this.state.userType;
		const query = {
			query:
				`
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
				// this.props.history.push('/opd-management/');
			}
		} catch (err) {
			throw err;
		}
	}

	render() {
		return (
			<div className='authform-container'>
				<div className="auth-form">
					<form onSubmit={this.handleSubmit}>
						<div className="form-fields">
							<label htmlFor='email'>Email:</label>
							<input type='email' id='email' ref={this.emailRef}></input>
						</div>
						<div className="form-fields">
							<label htmlFor='email'>Password:</label>
							<input type='password' id='password' ref={this.passwordRef}></input>
						</div>
						<div className="form-actions">
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