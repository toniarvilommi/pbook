import React from 'react'

const Filter = (props) => {

	return (
		<div className="form__group field">
			<input
				className="form__field"
				value={props.filter}
				placeholder="Filter from here"
				onChange={props.handleFilterChange}
			/>
			<label for="filter" class="form__label">Filter names</label>
		</div>
	)
}

export default Filter