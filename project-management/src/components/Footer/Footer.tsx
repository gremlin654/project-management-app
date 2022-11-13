import React from 'react';
import { ReactComponent as Git } from '../../assets/svg/github-icon.svg';
import { ReactComponent as RSlogo } from '../../assets/svg/rs_school_js.svg';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__year'>
          <p>© 2022 RSLang</p>
        </div>
        <div className='footer__gitHub'>
          <Git fill='#6c63ff' />
          <a href='https://github.com/yuliaN145'>YuliaN145</a>
          <a href='https://github.com/gremlin654'>gremlin654</a>
          <a href='https://github.com/diffickmenlogo'>diffickmenlogo</a>
        </div>
        <a href='https://rs.school/js/'>
          <RSlogo width='100px' fill='#6c63ff' />
        </a>
      </div>
    </footer>
  );
};
