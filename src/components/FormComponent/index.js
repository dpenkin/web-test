import React, { useState, memo } from 'react';

import "./style.css";

function FormComponent({ saveTodo }) {
  const [formData, setFormData] = useState();

  const handleForm = (e)=> {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
      status: false,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' placeholder='Name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' placeholder='Description' />
        </div>
      </div>
      <button data-testid='addId' disabled={formData === undefined ? true: false} >Add Todo</button>
    </form>
  )
}

export default memo(FormComponent);