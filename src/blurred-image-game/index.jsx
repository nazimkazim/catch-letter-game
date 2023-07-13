import React, { useEffect, useState } from 'react';
import './BlurredImage.css';
import BlurredImage from './BlurredImage';
import Button from './Button';
import WordInput from './WordInput';
import { FcNext, FcPrevious } from 'react-icons/fc';
import {words} from './data'

const BlurredImageGame = () => {
    const [blur, setBlur] = useState(50);
    const [currentImage, setCurrentImage] = useState(0);
    const [wordsData, setWordsData] = useState([])

    useEffect(() => {
        setWordsData(words.items)
    }, [])

    const handleImageBlur = () => {
        setBlur((prev) => prev - 10);
    };

    const goToNextWord = () => {
        setCurrentImage(prev => prev + 1 < wordsData.length ? prev + 1 : prev)
		setBlur(50)
    }

    const goToPrevWord = () => {
        setCurrentImage(prev => prev - 1 >= 0 ? prev - 1 : prev)
		setBlur(50)
    }

    return (
        <div className="blurred-image-container">
			{words.theme}
            { wordsData.length > 0 && 
                <BlurredImage image={wordsData[currentImage].image} blur={blur} />
            }
            <Button name="Reduce Blur" onClickHandler={handleImageBlur} />
            
            { wordsData.length > 0 && 
                <WordInput guessWord={wordsData[currentImage].name} />
            }

            <div className="prev-next-container">
                <Button icon={<FcPrevious />} onClickHandler={goToPrevWord} />
                <Button icon={<FcNext />} onClickHandler={goToNextWord} />
            </div>
        </div>
    );
};

export default BlurredImageGame;
