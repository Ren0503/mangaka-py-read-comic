import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
	return (
		<Spinner animation='border' role='status' style={styles.spinner}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	)
}

const styles = {
	spinner: {
		width: '100px',
		height: '100px',
		margin: 'auto',
		display: 'block'
	}
}

export default Loader
