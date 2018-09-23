import React from 'react';
import ContestPreview from './ContestPreview';


const ContestList = ({ contests, onContestClick }) => (
		<div className="ContestList">
				{Object.keys(contests).map(contestId =>
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

						<ContestPreview key={contestId}
						onClick={onContestClick}
						{...contests[contestId]} /> 
					)
				}
			</div>
	);

// ContestList Prop Validation
ContestList.propTypes = {
	contests: React.PropTypes.object,
	onContestClick: React.PropTypes.func.isRequired,
};

export default ContestList;