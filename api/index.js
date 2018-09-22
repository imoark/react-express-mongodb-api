/* this is a seperate module for API, so we don't have to put everything 
in the main server.js. Be modular!! 

So, we are going to manage all API requests in this module.*/
import express from 'express';

import data from '../src/testData';

 // we create a router object by calling the .Router() function in Express
const router = express.Router();

/* We will define .get() function/calls on the "router" object, and
handle them in the second argument. Since this is gonna be an API call, 
so we'll send a JSON response by sending an object here.*/
router.get('/contests', (req,res) => {
	res.send({ contests: data.contests });
});

// Finally, to be able to use the const "router" object, we need to export it
export default router;