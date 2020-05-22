import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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


class App extends Component {
	state = {
		avatar: {
			name: 'Creepysta',
			url: 'https://giantbomb1.cbsistatic.com/uploads/scale_medium/2/27436/2722697-gon_freecss_2617.jpg'
		}
	}
	render() {
		return (
			<BrowserRouter>
				<div className="opd-management-system">
					<Navbar avatar={this.state.avatar} />
					<div id="main">
						<Route exact path='/' component={Home} />
						<Route path='/dashboard' component={Dashboard} />
						<Route path='/departments' component={Departments} />
						<Route path='/doctors' component={Doctors} />
						<Route path='/patient' component={Patient} />
						<Route path='/schedule' component={Schedule} />
						<Route path='/appointments' component={Appointments} />
						<Route path='/prescriptions' component={Prescriptions} />
						<Route path='/case-mamanger' component={CaseManager} />
						<Route path='/enquiry' component={Enquiry} />
						<Route path='/settings' component={UserSettings} />
						<Route path='/contact-us' component={ContactUs} />
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
