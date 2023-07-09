import React from 'react';
import ReactDOM from 'react-dom';
import { CatchLetterGame } from './catch-letter-game';
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Data from './pages/Data';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
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

const Root = () => {
	return (
		<>
			<div>
				<Link to="/">Home</Link>
				<Link to="/catch-letter">Catch Letter</Link>
				<Link to="/data">Data</Link>
				<Link to="/contact">Contact</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
