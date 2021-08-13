import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import { shuffle, decodeString } from './utils';
import './app.css';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then((response) => response.json())
      .then((response) => {
        setFlashcards(
          response.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((answer) =>
                decodeString(answer)
              ),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer,
              options: shuffle(options),
            };
          })
        );
      });
  }, []);

  return (
    <div className='container'>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: ['2', '3', '4', '5'],
  },
  {
    id: 2,
    question: 'Question 2',
    answer: 'Answer',
    options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
  },
];

export default App;
