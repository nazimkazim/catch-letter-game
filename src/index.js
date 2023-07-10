import React from 'react';
import ReactDOM from 'react-dom';
import { CatchLetterGame } from './catch-letter-game';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Data from './pages/Data';
import { Navigation } from './components/Navigation';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/data" element={<Data />} />
				<Route path="/catch-letter" element={<CatchLetterGame />} />
			</Route>
		)
	);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
