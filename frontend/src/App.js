import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Doctors from './components/Doctors';
import Patient from './components/Patient';
import Schedule from './components/Schedule';
import Appointments from './components/Appointments';
import Prescriptions from './components/Prescriptions';
import CaseManager from './components/CaseManager';
import Enquiry from './components/Enquiry';
import UserSettings from './components/UserSettings';
import ContactUs from './components/ContactUs';
import AuthPage from './components/Auth';
import AuthContext from './context/auth-context';

class App extends Component {
	state = {
		userId: null,
		token: null,
		tokenLife: null,
		userType: null,
		user: null,
	}
	static contextType = AuthContext;

	bookAppointment = async (doctor, date, symptom) => {
		console.log(date);
		console.log(symptom);
		console.log(doctor);
		const query = {
			query:
				`
				mutation {
			  	scheduleAppointment(appointmentInput:{doctor:"${doctor}", symptom:"${symptom}", date: "${date}"}) {
						_id
						patient {
							_id
							name
							email
						}
						doctor {
							_id
							email
							experience
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
				'Authorization': 'Bearer ' + this.state.token
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
			// console.log('Doctors Component');
			// console.log(result);
			console.log('Book Appointment');
			console.log(result);
			let currUser = this.state.user;
			currUser.appointments = currUser.appointments.filter(appointment => appointment._id !== result.data.scheduleAppointment._id);
			currUser.appointments.push(result.data.scheduleAppointment);
			this.setState({
				user: currUser
			})
			console.log(this.state);
		} catch (err) {
			throw err;
		}
		
		this.setState({
			showModal: false,
		});
	}


	cancelAppointment = async (id) => {
		const query = {
			query : 
			`
				mutation {
					cancelAppointment(appointmentId:"${id}") {
						_id
						date
						patient {
							name
						}
						doctor {
							name
						}
					}
				}
			`
		};
		const body = {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
				'Authorization': 'Bearer ' + this.state.token, 
			},
			body: JSON.stringify(query),
		}
		try {
			const response = await fetch('http://localhost:8000/graphql', body);
			if(response.status === 200) console.log('Sucess');
			else console.log('Failed');
			const cancelledAppointment = await response.json();
			console.log('Cancel Appointment');
			console.log(cancelledAppointment);
			let currUser = this.state.user
			currUser.appointments.filter(appointment => appointment._id !== cancelledAppointment.data.cancelAppointment._id);
			this.setState({
				user: currUser,
			})
			console.log(this.state);
		} catch (err) {
			throw err;
		}
	}

	// TODO: async 
	login = async (token, userId, tokenLife, userType) => {
		let userData;
		let query;
		// console.log(token);
		// console.log(userId);
		// console.log(tokenLife);
		// console.log(userType);
		if (token) {
			if (userType) {
				query = {
					query: `
						query {
							getDoctor(id: "${userId}") {
								_id
								name
								email
								dpUrl
								department {
									name
								}
								experience
								specializations
								appointments {
									_id
									date
									symptom
									patient {
										name
										dpUrl
										email
									}
								}
							}
						}
					`
				};
			} else {
				query = {
					query:
						`
						query {
							getPatient(id: "${userId}") {
								_id
								name
								email
								dpUrl
								appointments {
									_id
									date
									symptom
									department {
										name
									}
									doctor {
										name
										email
										dpUrl
										specializations
										experience
										department {
											name
										}
									}
								}
							}
						}
					`
				};
			}
			let requestBody = {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/JSON',
					'Authorization': 'Bearer ' + token
				},
				body: JSON.stringify(query)
			};
			try {
				const response = await fetch('http://localhost:8000/graphql', requestBody);
				if(response.status === 200) console.log('Success');
				userData = await response.json();
			} catch (err) {
				console.log(err);
			}
			// console.log(userData);
			if(userData.data && (userData.data.getDoctor || userData.data.getPatient)) {
				this.setState({
					token: token,
					userId: userId,
					tokenLife: tokenLife,
					userType: userType,
					user: userType ? { ...userData.data.getDoctor } : { ...userData.data.getPatient }
				});
			}
			// console.log('APP');
			// console.log(this.state);
		}
	}

	logout = () => {
		this.setState({
			token: null,
			userId: null,
			userType: null,
			user: null,
			tokenLife: 0
		});
	}

	render() {
		// console.log(this.state);
		return (
			<BrowserRouter>
				<div className="opd-management-system">
					<AuthContext.Provider value={{
						token: this.state.token,
						userId: this.state.userId,
						tokenLife: this.state.tokenLife,
						userType: this.state.userType,
						user: this.state.user,
						login: this.login,
						logout: this.logout,
						bookAppointment: this.bookAppointment, 
						cancelAppointment: this.cancelAppointment, 
					}}>
						<Navbar />
						<div id="main">
							<Switch>
								<Route exact path='/opd-management/' component={Home} />
								<Route exact path='/opd-management/auth' component={AuthPage} />
								<Route exact path='/opd-management/dashboard' component={Dashboard} />
								<Route exact path='/opd-management/departments' component={Departments} />
								<Route exact path='/opd-management/doctors' component={Doctors} />
								<Route exact path='/opd-management/patient' component={Patient} />
								<Route exact path='/opd-management/schedule' component={Schedule} />
								<Route exact path='/opd-management/appointments' component={Appointments} />
								<Route exact path='/opd-management/prescriptions' component={Prescriptions} />
								<Route exact path='/opd-management/case-mamanger' component={CaseManager} />
								<Route exact path='/opd-management/enquiry' component={Enquiry} />
								<Route exact path='/opd-management/settings' component={UserSettings} />
								<Route exact path='/opd-management/contact-us' component={ContactUs} />
							</Switch>
						</div>
					</AuthContext.Provider>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
