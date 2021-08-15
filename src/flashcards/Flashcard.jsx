import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontElement = useRef();
  const backElement = useRef();

  function setMaxHeight() {
    const frontHeight = frontElement.current.getBoundingClientRect().height;
    const backHeight = backElement.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  function handleClick() {
    setFlipped(!flipped);
  }

  const { question, answer, options } = flashcard;

  useEffect(setMaxHeight, [question, answer, options]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      style={{ height: height }}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key !== 'Enter' || handleClick()}
    >
      <div className='front' ref={frontElement}>
        {question}
        <div className='flashcard-options'>
          {options.map((option) => (
            <div className='flashcard-option' key={option}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className='back' ref={backElement}>
        {answer}
      </div>
    </div>
  );
}
