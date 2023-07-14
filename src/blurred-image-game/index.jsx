import React, { useEffect, useState } from 'react';
import './BlurredImage.css';
import BlurredImage from './BlurredImage';
import Button from './Button';
import WordInput from './WordInput';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { words } from './data';

const BlurredImageGame = () => {
	const [blur, setBlur] = useState(50);
	const [currentImage, setCurrentImage] = useState(0);
	const [wordsData, setWordsData] = useState([]);
	const [hint, setHint] = useState(false);
	const [allSlotsFilled, setAllSlotsFilled] = useState(false);

	const imageIsClear = blur < 10

	const handleImageBlur = () => {
		setBlur((prev) => prev - 10);
		setHint((prev) => !prev);
	};

	useEffect(() => {
		setWordsData(words.items);
	}, []);

	const goToNextWord = () => {
		setCurrentImage((prev) => (prev + 1 < wordsData.length ? prev + 1 : prev));
		setBlur(50);
	};

	const goToPrevWord = () => {
		setCurrentImage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
		setBlur(50);
	};

	return (
		<div className="blurred-image-container">
			{wordsData.length > 0 && <BlurredImage image={wordsData[currentImage].image} blur={blur} />}
			{!allSlotsFilled && <Button disabled={imageIsClear} name="Reduce Blur" onClickHandler={handleImageBlur} />}
			{allSlotsFilled && <Button name="Check Word" onClickHandler={handleImageBlur} />}

			{wordsData.length > 0 && (
				<WordInput
					guessWord={wordsData[currentImage].name}
					onHint={hint}
					setAllSlotsFilled={setAllSlotsFilled}
					imageIsClear={imageIsClear}
				/>
			)}

			<div className="prev-next-container">
				<Button icon={<FcPrevious />} onClickHandler={goToPrevWord} />
				<Button icon={<FcNext />} onClickHandler={goToNextWord} />
			</div>
		</div>
	);
};

export default BlurredImageGame;
