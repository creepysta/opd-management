import React from 'react';

const modal = (props) => (
	<div className='modal'>
		<header className='modal-header'><h1>{props.title}</h1></header>
		<section className='modal-content'>
			{props.children}
		</section>
		<section className='modal-actions'>
			<button className='submit-btn btn' onClick={props.onCancel}>Cancel</button>
			<button className='submit-btn btn' onClick={props.onSubmit}>Proceed</button>
		</section>
	</div>
)

export default modal;