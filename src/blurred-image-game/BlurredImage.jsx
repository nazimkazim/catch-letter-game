import React from 'react';
import Apple from './img/apple.jpg';
import './BlurredImage.css';

const BlurredImage = ({ blur }) => {
	return (
		<div className="image">
			<img alt="image" src={Apple} style={{ filter: `blur(${blur}px)` }} />
		</div>
	);
};

export default BlurredImage;
