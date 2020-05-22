import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	state = {
		showNavbar: true,
	};

	toggleNav = (e) => {
		this.setState({
			showNavbar: !this.state.showNavbar
		});
		const showNav = this.state.showNavbar;
		if (showNav) {
			document.getElementById('sidenavbar').style.width = "250px";
			document.getElementById('topbar').style.marginLeft = "290px";
			document.getElementById('sidenavbar').style.padding = "20px";
			// document.getElementById('sidenav-toggle-btn').style.marginLeft = "290px";
			document.getElementById('main').style.marginLeft = "350px";
		} else {
			document.getElementById('sidenavbar').style.width = "0px";
			document.getElementById('topbar').style.marginLeft = "0px";
			document.getElementById('sidenavbar').style.padding = "0px";
			// document.getElementById('sidenav-toggle-btn').style.marginLeft = "0px";
			document.getElementById('main').style.marginLeft = "50px";
		}
	}

	toggleAccordions = (e) => {
		let accordions = document.getElementsByClassName('accordion');
		for (let i = 0; i < accordions.length; i++) {
			accordions[i].addEventListener('click', function () {
				var panel = this.nextElementSibling;
				if (panel.style.height === "0px") {
					panel.style.height = "120px";
					panel.style.padding = "10px 20px";
				} else {
					panel.style.height = "0px";
					panel.style.padding = "0px";
				}
			})
		}
	}

	genLinks = () => {
		let links = [];
		let routes = ['Dashboard', 'Case Manager', 'Setting', 'Contact Us'];
		for (let route in routes) {
			let url = '/'.concat(routes[route].toLowerCase().split(' ').join('-'));
			links.push(
				<div className="route" key={routes[route].toLowerCase().split(' ').join('-')} onClick={this.toggleNav}>
					<p><Link to={url} >{routes[route]}</Link></p>
				</div>
			)
		}
		// 'Patient'
		let panels = ['Schedule', 'My Appointments', 'My Prescription'];
		let panelNotices = [];
		for (let panel in panels) {
			let url = '/'.concat(panels[panel].toLowerCase().split(' ').join('-'));
			panelNotices.push(
				<div className="panel" key={panels[panel].toLowerCase().split(' ').join('-')}>
					<p><Link to={url} >{panels[panel]}</Link></p>
				</div>
			);
		}
		links.push(
			<div className="accordion" key={'Notices'.toLowerCase().split(' ').join('-')}>
				<p>Notices</p>
				<div className='root-panel'>
					{panelNotices.forEach((panel) => panel)}
				</div>
			</div>
		);
		panels = ['Department', 'Doctor', 'Enquiry'];
		let panelHospital = [];
		for (let panel in panels) {
			let url = '/'.concat(panels[panel].toLowerCase().split(' ').join('-'));
			panelHospital.push(
				<div className="panel" key={panels[panel].toLowerCase().split(' ').join('-')}>
					<p><Link to={url} >{panels[panel]}</Link></p>
				</div>
			);
		}
		links.push(
			<div className="accordion" key={'Hospital'.toLowerCase().split(' ').join('-')}>
				<p>Hospital</p>
				<div className='root-panel'>
					{panelHospital.forEach((panel) => panel)}
				</div>
			</div>
		);
		return links;
	}

	render() {
		const { avatar } = this.props;
		this.toggleAccordions();
		// let links = this.genLinks();
		return (
			<div className="nav">
				<div id="topbar">
					<button className="btn icon-btn" id="sidenav-toggle-btn" onClick={this.toggleNav}><i className="fa fa-bars"></i></button>
					<div className="route-name">Route Name</div>
					<button className="btn account-btn icon-btn">Log out</button>
					{/* <i className="fa fa-bars"></i> */}
				</div>
				<div className="sidenav">
					<div id="sidenavbar">
						<img src={avatar.url} alt={avatar.name} style={{ aspectRatio: 1 }} className="dp"></img>
						<p className="dp-tag">{avatar.name}</p>
						<hr></hr>
						<Link to='/'><button className="btn icon-btn" id="home-btn" onClick={this.toggleNav}><i className="fa fa-home"></i></button></Link>
						<br /><br />
						{/* { links } */}
						<div className="route" onClick={this.toggleNav}>
							<p><Link to='/dashboard' >Dashboard</Link></p>
						</div>

						<div className="accordion">
							<p>Notices</p>
						</div>
						<div className='root-panel'>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/schedule'>Schedule</Link></p>
							</div>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/appointments'>My Appointments</Link></p>
							</div>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/prescriptions'>My Prescriptions</Link></p>
							</div>
						</div>

						<div className="accordion">
							<p>Hospital</p>
						</div>
						<div className='root-panel'>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/departments'>Departments</Link></p>
							</div>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/doctors'>Doctors</Link></p>
							</div>
							<div className="route" onClick={this.toggleNav}>
								<p><Link to='/enquiry'>Enquiry</Link></p>
							</div>
						</div>

						<div className="route" onClick={this.toggleNav}>
							<p><Link to='/case-manager' >Case Manager</Link></p>
						</div>
						<div className="route" onClick={this.toggleNav}>
							<p><Link to='/contact-us' >Contact Us</Link></p>
						</div>
						<div className="route">
							<p><Link to='/settings' onClick={this.toggleNav}>User Settings</Link></p>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export default Navbar;
