import React from 'react';
import '../Registration/Registration.scss';
export function Login() {
  return (
    <div className='registration'>
      <form action=''>
        <div className='registration__form'>
          <div className='registration__form__title'>
            <h1>Login</h1>
          </div>
          <div className='registration__form__input'>
            <input type='text' placeholder='Login' />
          </div>
          <div className='registration__form__input'>
            <input type='text' placeholder='Password' />
          </div>
          <input type='submit' className='registration__form__input__submit' value={'Submit'} />
        </div>
      </form>
    </div>
  );
}
