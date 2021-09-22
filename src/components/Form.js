import React from 'react'
import contacts from "../services/contacts";


const Form = (props) => {
	//Props to variables
	const newName = props.newName
	const newNumber = props.newNumber
	const persons = props.persons
	const setPersons = props.setPersons
	const setNewName = props.setNewName
	const setNewNumber = props.setNewNumber
	const setErrorMessage = props.setErrorMessage
	const setErrorMessageType = props.setErrorMessageType
	// const setFilter = props.setFilter

	const addPerson = (event) => {
		let inList = false
		event.preventDefault()

		const tempPerson = {
			name: newName,
			number: newNumber
		}

		persons.forEach(element => {
			if (tempPerson.name.toLowerCase() === element.name.toLowerCase()) {
				alert(`${newName} is already in the phonebook`)
				if (window.confirm("Do you want to replace the phone number?")) {
					const tempObject = element //Temporary object 
					const changedNumber = { ...tempObject, number: newNumber } //Changes data of the object
					console.log('element to update', changedNumber);

					contacts
						.updateContact(element.id, changedNumber)
						.then(returnedNumber => {
							console.log('wtf is returned number?', returnedNumber);
							setPersons(persons.map(number => number.id !== element.id ? number : returnedNumber)) //Return original object(number), if id is not id of the element. Else replace with the new object(returnedNumber)

							// Notification message
							setErrorMessage(`Changed number for ${returnedNumber.name}`)
							setErrorMessageType(2)
							setTimeout(() => {
								setErrorMessage(null)
							}, 2000)
							//Empty fields
							setNewName('')
							setNewNumber('')
						})
				}
				setNewName('')
				setNewNumber('')
				inList = true
			}
		});

		if (!inList) {
			contacts
				.createContact(tempPerson)
				.then(response => {
					console.log('response in creating', response);
					setPersons(persons.concat(response))
					// Notification message
					setErrorMessage(`Added ${response.name}`)
					setErrorMessageType(1)
					setTimeout(() => {
						setErrorMessage(null)
					}, 2000)
					//Empty fields
					setNewName('')
					setNewNumber('')
				})

		}


	}
	//Must be checked every new input
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	//Must be checked every new input
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}


	return (
		<>
			<form onSubmit={addPerson}>
				<div className="form__group field">
					<input
						className="form__field"
						value={newName}
						placeholder="Write name here"
						onChange={handleNameChange}
					/>
					<label for="name" class="form__label">Name</label>
				</div>
				<div className="form__group field">
					<input
						className="form__field"
						value={newNumber}
						placeholder="040-1234567"
						onChange={handleNumberChange}
					/>
					<label for="number" class="form__label">Number</label>

				</div>
				<div className="submitContainer">
					<button type="submit" className="button">Add contact</button>
				</div>
			</form>
		</>
	)
}

export default Form