import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navigation.css'

export const Navigation = () => {
	return (
		<>
			<div className='navigation'>
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