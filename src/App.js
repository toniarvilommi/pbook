import './App.scss';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Notification from './components/Notification.js'
import ShowPeople from './components/ShowPeople.js'
import contacts from "./services/contacts";


const App = () => {

	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [errorMessageType, setErrorMessageType] = useState(1)

	//Fetch data from server
	const fetchedData = () => {
		contacts
			.getContacts()
			.then(response => {
				console.log('Fetch successful');
				const tempPersons = response
				setPersons(tempPersons)
			})
	}
	useEffect(fetchedData, [])

	//Must be checked with every new input
	const handleFilterChange = (event) => {
		setFilter(event.target.value)

	}

	return (
		<div className="App">

			<div>
				<h1>Phonebook</h1>

			</div>
			<h2>Add new contact</h2>
			<Form
				newName={newName}
				newNumber={newNumber}
				persons={persons}
				setPersons={setPersons}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
				setFilter={setFilter}
				setErrorMessage={setErrorMessage}
				setErrorMessageType={setErrorMessageType}
			/>
			<h2>Contact Book</h2>
			<ShowPeople
				setPersons={setPersons}
				persons={persons}
				filter={filter}
				setErrorMessage={setErrorMessage}
				setErrorMessageType={setErrorMessageType}
			/>
			<Filter
				filter={filter}
				handleFilterChange={handleFilterChange}
			/>
			<Notification message={errorMessage} type={errorMessageType} />
		</div >
	)

}

export default App
