import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = '/api/persons'

/*
* Get the json file from baseUrl and it's content
*/
const getContacts = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

/*
* Create new contact (Object)
*/
const createContact = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

/*
*  Delete the selected contact (Object)
*/
const deleteContact = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response)
}

/*
* Update the selected contact (Object)
*/
const updateContact = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

// To get rid of warning

const exportedObject = {
	createContact,
	getContacts,
	deleteContact,
	updateContact
};

// Advanced declaration of object literals
export default exportedObject