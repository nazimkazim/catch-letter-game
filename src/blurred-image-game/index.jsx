import React, { useState } from 'react';
import './BlurredImage.css';
import BlurredImage from './BlurredImage';
import Button from './Button';

const BlurredImageGame = () => {
  
	const [blur, setBlur] = useState(60);

  const handleImageBlur = () => {
    setBlur((prev) => prev - 10)
  }
	return (
			<div className="blurred-image-container">
				<BlurredImage blur={blur} />
				<Button name="Reduce Blur" onClickHandler={handleImageBlur} />
			</div>
	);
};

export default BlurredImageGame;
