import React, { Component } from "react";
import Department from './Department';

class Departments extends Component {
	state = {
		departments: [],
	};

	handleSubmit = (event) => {
		event.preventDefault();
	}

	handleSearch = (event) => {
		console.log(event.target.value);
		// do database query fetch doctors
		// store in doctors and set the list in state
		let departments = [];
		this.setState({
			departments: departments
		})
	}

	render() {
		let dispList = [];
		this.state.departments.forEach((department) => dispList.push(
			<Department department={department} key={department.id} />
		));
		return (
			<div className="department">
				<div className="search-form">
					<form onSubmit={this.handleSubmit} className="search department-name">
						<p><input className='search-field' type="text" name="search-name" placeholder='Search by department' onChange={this.handleSearch}/></p>
						<input className='submit-btn' type="button" value="Search"/>
					</form>
				</div>
				<div className="display-data">
					{dispList}
				</div>
			</div>
		);
	}
}

export default Departments