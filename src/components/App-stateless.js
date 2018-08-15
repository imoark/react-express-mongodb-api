// This is a stateless example of App.js
// By stateless mean, we can't use the React state with this component.
// So, this is just the syntax that we use. It kinda reduce the dynamicality.
// 


import React from 'react';

// import component module of Header, so we keep this .js file concise
import Header from './Header';

/* The first ReactDOM API/method that we need is to render something.
So the function is .render(), and this function takes two arguments.
The first argument is "what to render",and we are gonna render a React element.
The second argument is where we want this element to be rendered. */
/* React.createElement() = First argument is the HTML tag type, 
the second argument is any attributes that we want the tag to have. 
Pass a null if there is no attribute. The rest of the argument are all 
of the children that we want this element to have.*/
// ReactDOM.render(
// 	React.createElement('h2', null, 'Hello React'),
// 	document.getElementById('root')
// );

/* Doing the stuff with ReactDOM API like that is not so pleasant,
since we are already familiar with the way HTML looks, we are 
gonna use JSX. With JSX, we get to actually write HTML in here. This
will work because we configured Babel to actually compile this code into
React. */
const App = () => {
	return (
		<div className="App">
			<Header message="Naming Contest" />
		</div>
		);
};

/* For other modules to use the header module, we need to export it.*/
export default App;