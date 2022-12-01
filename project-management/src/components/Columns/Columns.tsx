import React from 'react';
import './Columns.scss';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { Column } from 'components/Column/Column';
import { IColumns } from 'models/assets';

const btnAddBoardStyle = {
  width: '22rem',
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: '0.6rem 1.4rem',
  gap: ' 0.5rem',
  alignItems: 'center',
  backgroundColor: '#a3ca01',
  '&:hover': { backgroundColor: '#809f00' },
  '@media (max-width: 648px)': { height: '3rem' },
};

const iconBtnStyle = {
  width: '3rem',
  height: '3rem',
  '@media (max-width: 648px)': { width: '2rem', height: '2rem' },
};

const textBtnStyle = { fontWeight: 600, fontSize: '1.4rem' };

export const Columns: React.FC<IColumns> = ({ idBoard }) => {
  const { currentColumns } = useAppSelector((state) => state.boardsSlice);
  const { addColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setAddColumn = () => {
    dispatch(addColumn(true));
  };

  return (
    <div className='columns__container'>
      <div className='columns__wrapper'>
        {currentColumns && currentColumns.map((item) => <Column key={item._id} item={item} />)}
        <Button variant='contained' sx={btnAddBoardStyle} onClick={setAddColumn}>
          <PostAddIcon sx={iconBtnStyle} />
          <Typography sx={textBtnStyle}>{t('boardPage.addColumnBtn')}</Typography>
        </Button>
      </div>
    </div>
  );
};
