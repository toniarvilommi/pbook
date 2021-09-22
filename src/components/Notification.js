import React from 'react'

const Notification = ({ message, type }) => {
	if (message === null) {
		return null
	}

	switch (type) {
		case 1:
			type = 'add'
			break;
		case 2:
			type = 'change'
			break;
		case 3:
			type = 'delete'
			break;
		default:
			type = 'add'
	}

	if (!message) {
		return (
			<div >
			</div>
		)
	}

	return (
		<div className={`${type} notification`}>
			<h3>{message}</h3>
		</div>
	)
}

export default Notification