/* We'll read the port number from the configuration file config.js.
./config means that within the same path of this server.js file */
import config from './config';
import apiRouter from './api';

import sassMiddleware from 'node-sass-middleware';
import path from 'path';

// import into a varible named "express" from the node modules express
import express from 'express';

/* To create a server in Express, we need to invoke the 
imported Express variable as a function. In the Express source code package,
default export there is just a function */
const server = express();

// To use sassMiddleware with the Express/server
/* We do server.use(sassMiddleware()), sassMiddleware() is a function,
and this function takes an "object". And inside the object, we specified 
configuration that we want to work with the middle-ware, most importantly
we need a source directory and the compiled target path. Thus, we use the
part module from native Node.*/
server.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}))

/* This line is to enable EJS. The way Express works is that by default 
it will look for the EJS templates under the "views" folder 
on the root level.*/
server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get('/', (req, res) => {
	serverRender()
		.then( ({ initialMarkup, initialData}) => {
			res.render('index', {
				initialMarkup,
				initialData
			});
		})
		.catch(console.error);

	
});

/* Instead of listening to a single request event, Express server also
handles server side routing for us. So, it exposes an API to listen
to certain routes. We use the .get() method/API, and the first argument is
the path of the route. Second argument is the event handler, which
similar to the HTTP module, receives both a request and a response object.
*/

// In this case, the path is the root
// server.get('/', (req, res) => {
// 	res.send('Hello Express');
// });

/* In general, usually the response that a server would do is sending the
Data to client. Manually, if we do it using the HTTP module, we would
need to use fs.readFile() and put res.send(data.toString()). But in
Express, there is a simpler way by using a static middleware that we
can use to automatically serve static assets, like the public folder.*/
server.use(express.static('public'));
server.use('/api', apiRouter);

/* Same as in HTTP module, we also do a .listen() method 
on the Express server. First argument in the .listen() will be
the variable config, and the object port inside config variable. Thus,
"config.port". */
/* The second argument to the Express .listen() is the success handler,
which is just a function. In this case, we will just output a line to
the console.*/
server.listen(config.port, config.host, () => {
	console.info('Express listening to port ', config.port);
});

