import React, { useState } from 'react'
import contacts from "../services/contacts";
import { GoPerson } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";

const ShowPeople = (props) => {
	//Props to variables
	const setPersons = props.setPersons
	const persons = props.persons
	const filter = props.filter
	const setErrorMessage = props.setErrorMessage
	const setErrorMessageType = props.setErrorMessageType
	//State
	const [showDelete, setDelete] = useState(0)

	const handleInput = (event) => {
		let id = event.target.value
		console.log('ID IS:', id);
		if (window.confirm("Do you really want to delete this?")) {

			//Need to append the array for temporary use, so it's referencable later in the "error message"
			//Otherwise will get an error, because the data has been deleted already!
			contacts
				.deleteContact(id)
				.then(response => {
					// Notification message
					// Has to be before filtering, because it created a bug
					setErrorMessage(`Removed`)
					setErrorMessageType(3)
					setTimeout(() => {
						setErrorMessage(null)
					}, 2000)

					//Fetch data and add it to setPersons state
					contacts
						.getContacts()
						.then(response => {
							console.log('Fetch successful after deletion');
							const tempPersons = response
							setPersons(tempPersons)
						})
				})
				.catch(function (error) {
					console.log(error);

					// Notification
					setErrorMessage(`Information of selected user has already been deleted`)
					setErrorMessageType(3)
					setTimeout(() => {
						setErrorMessage(null)
					}, 2000)

				})
		}


	}

	const handleHover = (event) => {
		setDelete(event)
	}

	if (typeof persons !== 'undefined' && persons.length === 0) {
		return (
			<>
				<p>No contacts found, start by adding some.</p>
			</>
		)
	}

	return (
		<>
			{persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
				<div key={person.name} className="contact"
					onMouseOver={() => handleHover(person.id)}
					onMouseOut={() => setDelete(0)}
				>

					<p key={person.name}><GoPerson /> {person.name} - <FaPhoneAlt /> {person.number}</p>
					<button
						style={person.id === showDelete ? { display: 'block' } : { display: 'none' }}
						className="remove-button"
						value={person.id}
						onClick={handleInput}
					>delete</button>
				</div>
			)
			}
		</>
	)
}

export default ShowPeople