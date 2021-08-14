import React, { useRef } from 'react';

export default function Header({ categories, submit }) {
  const amountElement = useRef();
  const categoryElement = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const amount = amountElement.current.value;
    const category = categoryElement.current.value;
    submit(amount, category);
  }

  return (
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
  );
}
