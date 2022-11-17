import React from 'react';
import '../../pages/Board/Board.scss';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';

export const Board = () => {
  return (
    <div className='boards'>
      <h1 className='boards__title'>Your Boards</h1>
      <div className='board-container'>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>
            ExampleExampleExampleExampleExampleExampleExample
          </div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
        <div className='board'>
          <Trash className='board__trash' />
          <h3 className='board__title'>Example</h3>
          <div className='board__description'>Example</div>
        </div>
      </div>
    </div>
  );
};
