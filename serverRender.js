// We need a server code to be able to read data from the API part that is (in most common situation) somewhere remote.

// fetch the data from the API

import config from './config';
import axios from 'axios';


// Instead of hard-coding any server HOST in here,
// we should read it from the configuration (dynamically).
// In this case, we read it from the config.js file.
axios.get(`${config.serverUrl}/api/contests`)
	.then(resp => {
		console.log(resp.data);
	})