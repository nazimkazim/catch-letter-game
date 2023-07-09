import React from 'react';
import ReactDOM from 'react-dom';
import { CatchLetterGame } from './catch-letter-game';

const App = () => {

	return (
		<div className="App">
			<CatchLetterGame />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
