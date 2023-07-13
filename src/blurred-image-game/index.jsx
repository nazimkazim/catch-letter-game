import React, { useEffect, useState } from 'react';
import './BlurredImage.css';
import BlurredImage from './BlurredImage';
import Button from './Button';
import WordInput from './WordInput';
import { FcNext, FcPrevious } from 'react-icons/fc';
import {words} from './data'

const BlurredImageGame = () => {
	const [blur, setBlur] = useState(60);
	const [currentImage, setCurrentImage] = useState(0);
	const [wordsData, setWordsData] = useState([])

	useEffect(() => {
		setWordsData(words.items[currentImage])
	}, [currentImage])

	const handleImageBlur = () => {
		setBlur((prev) => prev - 15);
	};

	const goToNextWord = () => {
		setCurrentImage(prev => prev + 1)
	}

	const goToPrevWord = () => {
		setCurrentImage(prev => prev - 1)
	}

	return (
		<div className="blurred-image-container">
			<BlurredImage image={wordsData.image} blur={blur} />
			<Button name="Reduce Blur" onClickHandler={handleImageBlur} />
			
			{ wordsData.name &&	<WordInput guessWord={wordsData.name} />}

			
			<div className="prev-next-container">
				<Button icon={<FcPrevious />} onClickHandler={goToPrevWord} />
				<Button icon={<FcNext />} onClickHandler={goToNextWord} />
			</div>
		</div>
	);
};

export default BlurredImageGame;
