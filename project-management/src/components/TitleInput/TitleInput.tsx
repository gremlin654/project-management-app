import React from 'react';

export interface ITitleInput {
  titleInput: string;
  setIsInputActive: React.Dispatch<React.SetStateAction<boolean>>;
  sendNewTitle: () => void;
  setTitleInput: React.Dispatch<React.SetStateAction<string>>;
}

export const TitleInput: React.FC<ITitleInput> = ({
  titleInput,
  setIsInputActive,
  sendNewTitle,
  setTitleInput,
}) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const closeInput = () => {
    setIsInputActive(false);
  };

  return (
    <div className='column__input-container'>
      <input className='column__input' value={titleInput} onChange={handleChangeInput} autoFocus />
      <button className='column__input-btn-true' onClick={sendNewTitle}>
        ☑
      </button>
      <button className='column__input-btn-false' onClick={closeInput}>
        ❎
      </button>
    </div>
  );
};
