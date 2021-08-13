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
      onClick={() => setFlipped(!flipped)}
    >
      <div className='front' ref={frontElement}>
        {question}
        <div className='flashcard-options'>
          {options.map((option, i) => (
            <div className='flashcard-option' key={i}>
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
