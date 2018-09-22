import React from 'react';

// import component module of Header, so we keep this .js file concise
import Header from './Header';
import ContestPreview from './ContestPreview';

import axios from 'axios';

/* Let's assume that this component is going to need some state.
We wanna make it dynamic based on where we are in the App.
We wanna put the dynamic content as a "state".*/
/* So we need to convert it first into a class-based component.*/
// const App = () => {
// 	return (
// 		<div className="App">
// 			<Header message="Naming Contest" />
// 		</div>
// 		);
// };

class App extends React.Component {
	// Since we configured 'stage-2' in .babelrc, we can actually use
	// a class property instead of having a constructor.
	//
	// constructor(props){
	// 	super(props);
	// 	this.state = { test: 42 };
	// }
	state = { 
		pageHeader: 'Naming Contest',
		contests: []
	};
	componentDidMount(){
		axios.get('/api/contests')
			.then(resp => {
				this.setState({
					contests: resp.data.contests
				});
				console.log(resp.data.contests);
			})
			.catch(console.error);


	}
	render() {
		return (
		<div className="App">
			<Header message={this.state.pageHeader} />
			<div>
				{this.state.contests.map(contest =>
						/* 
						everytime we display a list of things dynamically,
						REACT needs a little bit of help to identify every
						element with a key. This key helps REACT identify
						the element when this array of children changes.

						In other words, everytime we have a map call, we
						beed to provide a unique key to identify the child
						element inside that map. ADVICE: Do not use the array
						index as a unique key.
						*/

						<ContestPreview key={contest.id} {...contest} /> 
					)
				}
			</div>
		</div>
		);
	}
};


/* For other modules to use the header module, we need to export it.*/
export default App;