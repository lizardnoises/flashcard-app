import React, { useState, useEffect } from 'react';
import FlashcardList from './flashcards/FlashcardList';
import Header from './header/Header';
import { shuffle, decodeString } from './utils';
import './app.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((response) => {
        setCategories(response.trivia_categories);
      });
  }, []);

  function handleHeaderSubmit(amount, category) {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}`)
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
  }

  return (
    <>
      <Header categories={categories} submit={handleHeaderSubmit} />
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
