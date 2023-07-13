import React from 'react';
import './BlurredImage.css';

const BlurredImage = ({ blur, image }) => {
	return (
		<div className="image">
			<img alt="image" src={image} style={{ filter: `blur(${blur}px)` }} />
		</div>
	);
};

export default BlurredImage;
