import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
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

	// TODO: async 
	login = async (token, userId, tokenLife, userType) => {
		let userData;
		let query;
		if (token) {
			if (userType) {
				query = {
					query: `
						query {
							getDoctor(id: "${userId}") {
								_id
								name
								dpUrl
								email
								department {
									name
								}
								experience
								specializations
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
								dpUrl
								name
								email
								age
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
				userData = await (await fetch('http://localhost:8000/graphql', requestBody)).json();
			} catch (err) {
				console.log(err);
			}
			// console.log(userData);
			this.setState({
				token: token,
				userId: userId,
				tokenLife: tokenLife,
				userType: userType,
				user: userType ? { ...userData.data.getDoctor } : { ...userData.data.getPatient }
			});
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
						logout: this.logout
					}}>
						<Navbar />
						<div id="main">
							<Switch>
								<Route exact path='/opd-management/' component={Home} />
								<Route path='/opd-management/auth' component={AuthPage} />
								<Route path='/opd-management/dashboard' component={Dashboard} />
								<Route path='/opd-management/departments' component={Departments} />
								<Route path='/opd-management/doctors' component={Doctors} />
								<Route path='/opd-management/doctors/:id' component={Doctor} />
								<Route path='/opd-management/patient' component={Patient} />
								<Route path='/opd-management/schedule' component={Schedule} />
								<Route path='/opd-management/appointments' component={Appointments} />
								<Route path='/opd-management/prescriptions' component={Prescriptions} />
								<Route path='/opd-management/case-mamanger' component={CaseManager} />
								<Route path='/opd-management/enquiry' component={Enquiry} />
								<Route path='/opd-management/settings' component={UserSettings} />
								<Route path='/opd-management/contact-us' component={ContactUs} />
							</Switch>
						</div>
					</AuthContext.Provider>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
