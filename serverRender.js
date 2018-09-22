// We need a server code to be able to read data from the API part that is (in most common situation) somewhere remote.

// fetch the data from the API
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';


// Instead of hard-coding any server HOST in here,
// we should read it from the configuration (dynamically).
// In this case, we read it from the config.js file.

const serverRender = () =>
	axios.get(`${config.serverUrl}/api/contests`)
	.then(resp => {
		return { 
			initialMarkup: ReactDOMServer.renderToString(
				<App initialContests={resp.data.contests} />
			),
			initialData: resp.data
		};

		
		// console.log(resp.data);
	});

export default serverRender;