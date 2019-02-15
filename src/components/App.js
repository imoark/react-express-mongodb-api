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

	static propTypes = {
		initialContests: React.PropTypes.object.isRequired
	}

	state = this.props.initialContests;

	// { 
	// 	pageHeader: 'Naming Contest',
	// 	contests: this.props.initialContests
	// };

	// In setting up state, try to set the minimum amount of state.
	// Only put on the state the things that you can't compute from
	// other things. And if there is something that you can compute,
	// instead of putting it on the state, just compute it.


	componentDidMount(){

	}

	fetchContest = (contestId) => {
		alert('alert')
		pushState({ currentContestId: contestId },`/contest/${contestId}`);
		api.fetchContest(contestId).then(contest => {
			this.setState({
				// pageHeader: contest.contestName,
				currentContestId: contest.id,
				contests: {
					...this.state.contests,
					[contest.id]: contest
				}
			});
		})
	};

	// create a pageHeader() function/method
	// if we have a currentContestId on the state, then the pageHeader
	// is going to be this.currentContest()
	// If not, then it will be just 'Naming Contests'
	pageHeader(){
		if (this.state.currentContestId){
			return this.currentContest().contestName
		}

		return 'Naming Contests';
	}

	currentContest(){
		return this.state.contests[this.state.currentContestId];
	}

	currentContent() {
		if (this.state.currentContestId){
			return <Contest {...this.currentContest()} />;
		}

		return <ContestList 
				onContestClick={this.fetchContest}
				contests={this.state.contests} />;
	} 
	
	render() {
		return (
		<div className="App">
			<Header message={this.pageHeader()} />
			{this.currentContent()}
		</div>
		);
	}
};


/* For other modules to use the header module, we need to export it.*/

export default App;