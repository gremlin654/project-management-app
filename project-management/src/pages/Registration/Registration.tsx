import React from 'react';
import './Registration.scss';
export function Registration() {
  return (
    <div className='registration'>
      <form action=''>
        <div className='registration__form'>
          <div className='registration__form__title'>
            <h1>Registration</h1>
          </div>
          {/* <label className='registration__form__text' htmlFor='Name'>
            Name
          </label> */}
          <div className='registration__form__input'>
            <input type='text' placeholder='Name' />
          </div>
          {/* <label className='registration__form__text' htmlFor='Login'>
            Login
          </label> */}
          <div className='registration__form__input'>
            <input type='text' placeholder='Login' />
          </div>
          {/* <label className='registration__form__text' htmlFor='Password'>
            Password
          </label> */}
          <div className='registration__form__input'>
            <input type='text' placeholder='Password' />
          </div>
          <input type='submit' className='registration__form__input__submit' value={'Submit'} />
        </div>
      </form>
    </div>
  );
}
