import React, { useState, createRef, useEffect } from 'react';

const WordInput = ({ guessWord, onHint, setAllSlotsFilled, imageIsClear }) => {
	const [word, setWord] = useState([]);
	const inputRefs = Array(guessWord.length)
		.fill()
		.map(() => createRef());

	useEffect(() => {
		if (imageIsClear) {
			setWord(guessWord.split(''));
		} else {
			setWord(Array(guessWord.length).fill(''));
		}
	}, [imageIsClear, guessWord]);

	const onChangeHandler = (e, index) => {
		let newWord = [...word];
		newWord[index] = e.target.value;
		setWord(newWord);

		// if this is not the last input field, focus the next one
		if (index < word.length - 1 && e.target.value !== '') {
			inputRefs[index + 1].current.focus();
		}
		// if this is the last input field and the value is not empty, update the word
		else if (index === word.length - 1 && e.target.value !== '') {
			setWord(newWord);
		}

		const allFilled = newWord.every((char) => char !== '');

		if (allFilled) {
			setAllSlotsFilled(true);
		} else {
			setAllSlotsFilled(false);
		}
	};

	const onKeyUpHandler = (e, index) => {
		if (e.key === 'Backspace' && e.target.value === '') {
			// if this is not the first input field, focus the previous one
			if (index > 0) {
				inputRefs[index - 1].current.focus();
			}
		}
	};

	const onHintHandler = () => {
		let emptyIndices = word.map((letter, index) => (letter === '' ? index : -1)).filter((index) => index !== -1);
		if (emptyIndices.length !== 0) {
			let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
			let newWord = [...word];
			newWord[randomIndex] = guessWord[randomIndex];
			setWord(newWord);
		}

		if (imageIsClear) {
			setWord(guessWord.split(''));
		}
	};

	useEffect(() => {
		onHintHandler();
	}, [onHint]);

	return (
		<div className="word-input">
			{word.map((letter, index) => {
				return (
					<input
						ref={inputRefs[index]}
						onChange={(e) => onChangeHandler(e, index)}
						onKeyUp={(e) => onKeyUpHandler(e, index)}
						key={index}
						value={letter}
						maxLength={1}
					/>
				);
			})}
		</div>
	);
};

export default WordInput;
