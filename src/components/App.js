import React from 'react';

// import component module of Header, so we keep this .js file concise
import Header from './Header';
import ContestPreview from './ContestPreview';

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
	// Since we configured 'stage-2' in . babelrc, we can actually use
	// a class property instead of having a constructor.
	// constructor(props){
	// 	super(props);
	// 	this.state = { test: 42 };
	// }
	state = { 
		pageHeader: 'Naming Contest' 
	};
	render() {
		return (
		<div className="App">
			<Header message={this.state.pageHeader} />
			<div>
				{this.props.contests.map( contest =>
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