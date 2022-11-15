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
          <a href='https://github.com/yuliaN145'>
            <Git fill='#6c63ff' width='3rem' height='3rem' />
            <span>YuliaN145</span>
          </a>
          <a href='https://github.com/gremlin654'>
            <Git fill='#6c63ff' width='3rem' height='3rem' />
            <span>gremlin654</span>
          </a>
          <a href='https://github.com/diffickmenlogo'>
            <Git fill='#6c63ff' width='3rem' height='3rem' />
            <span>diffickmenlogo</span>
          </a>
        </div>
        <a href='https://rs.school/js/'>
          <RSlogo width='100px' fill='#6c63ff' />
        </a>
      </div>
    </footer>
  );
};
