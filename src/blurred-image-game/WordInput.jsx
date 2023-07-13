import React, { useState, createRef } from 'react';

const WordInput = ({guessWord}) => {
    const [word, setWord] = useState(Array(guessWord.length).fill(""));
    const inputRefs = Array(5).fill().map(() => createRef());

    const onChangeHandler = (e, index) => {
        let newWord = [...word];
        newWord[index] = e.target.value;
        setWord(newWord);

        // if this is not the last input field, focus the next one
        if (index < word.length - 1 && e.target.value !== '') {
            inputRefs[index + 1].current.focus();
        }
    }

    const onKeyUpHandler = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            // if this is not the first input field, focus the previous one
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    }

    return (
        <div className='word-input'>{
            word.map((letter, index) => {
                return  <input 
                            ref={inputRefs[index]}
                            onChange={(e) => onChangeHandler(e, index)} 
                            onKeyUp={(e) => onKeyUpHandler(e, index)}
                            key={index} 
                            value={letter}
                            maxLength={1}  
                        />
            })
        }</div>
    );
};

export default WordInput;
