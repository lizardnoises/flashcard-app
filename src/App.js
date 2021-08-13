import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import { shuffle, decodeString } from './utils';
import './app.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryElement = useRef();
  const amountElement = useRef();

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((response) => {
        setCategories(response.trivia_categories);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `https://opentdb.com/api.php?amount=${amountElement.current.value}&category=${categoryElement.current.value}`
    )
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
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryElement}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            id='amount'
            min='1'
            step='1'
            defaultValue={10}
            ref={amountElement}
          />
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
