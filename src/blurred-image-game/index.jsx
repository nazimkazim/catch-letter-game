import React, { useState } from 'react';
import './BlurredImage.css';
import BlurredImage from './BlurredImage';
import Button from './Button';
import WordInput from './WordInput';

const BlurredImageGame = () => {
  
	const [blur, setBlur] = useState(60);

  const handleImageBlur = () => {
    setBlur((prev) => prev - 20)
  }
	return (
			<div className="blurred-image-container">
				<BlurredImage blur={blur} />
				<Button name="Reduce Blur" onClickHandler={handleImageBlur} />
				<WordInput />
			</div>
	);
};

export default BlurredImageGame;
