import React, { useState } from 'react';

export default function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, i) => (
            <div className='flashcard-option' key={i}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className='back'>{flashcard.answer}</div>
    </div>
  );
}
