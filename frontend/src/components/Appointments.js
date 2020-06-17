import React, { Component } from "react";
import AuthContext from '../context/auth-context';

class Appointments extends Component {
	state = {
		appointments: null,
	}

	componentDidMount() {
		
	}

	static contextType = AuthContext;

	getAppointments = async () => {
		const query = {
			query:
				`
				query {
					appointments {
						department {
							_id
							name
						}
						patient {
							name
							appointments {
								_id
							}
						}
						doctor {
							name
							appointments {
								_id
							}
							specializations
							department {
								name
							}
						}
						date
						slot
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
			if (result.data && result.data.appointments) {
				
				// this.props.history.push('/opd-management/');
			}
		} catch (err) {
			throw err;
		}
	}

	render() {
		return (
			<React.Fragment>
				{!this.state.appointments && <div className="appointments"><p>No upcoming appointments</p></div>}
				{this.state.appointments && 
					<div className="appointments">

					</div>}
			</React.Fragment>
		)
	}
}

export default Appointments