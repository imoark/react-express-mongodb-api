import React from 'react';

// import component module of Header, so we keep this .js file concise
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

// We are putting the HTML5 History API as a function here.
// We are using the most basic/standard way of routing, with the help
// of HTML5 History API, to navigate back and forth.
const pushState = (obj, url) =>
	window.history.pushState(obj, '', url);

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
		contests: this.props.initialContests
	};
	componentDidMount(){

	}

	fetchContest = (contestId) => {
		pushState({ currentContestId: contestId },`/contest/${contestId}`);
		api.fetchContest(contestId).then(contest => {
			this.setState({
				pageHeader: contest.contestName,
				currentContestId: contest.id,
				contests: {
					...this.state.contests,
					[contest.id]: contest
				}
			});
		})
	};

	currentContent() {
		if (this.state.currentContestId){
			return <Contest {...this.state.contests[this.state.currentContestId]} />;
		}

		return <ContestList 
				onContestClick={this.fetchContest}
				contests={this.state.contests} />;
	} 
	
	render() {
		return (
		<div className="App">
			<Header message={this.state.pageHeader} />
			{this.currentContent()}
		</div>
		);
	}
};


/* For other modules to use the header module, we need to export it.*/

export default App;