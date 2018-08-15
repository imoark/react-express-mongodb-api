import React from 'react';

const Header = ({ message }) => {
	return(
		<h2 className="Header text-center">
			{message}
		</h2>
		);
};

// Header Prop Validation
Header.propTypes = {
	message: React.PropTypes.string
};

/* For other modules to use the header module, we need to export it.*/
export default Header;