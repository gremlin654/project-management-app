import React, { useEffect } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import '../AddBoard/AddBoard.scss';

export const SpinnerBoard = () => {
  useEffect(() => {
    document.body.classList.add('block');

    return () => {
      document.body.classList.remove('block');
    };
  }, []);

  return (
    <div className='add-board-modal__wrapper'>
      <Spinner />
    </div>
  );
};
