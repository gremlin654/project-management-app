import React, { useCallback, useEffect, useState } from 'react';
import './Columns.scss';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { Column } from 'components/Column/Column';
import { IAddAllColumns, IColumns } from 'models/assets';
import { setColumns } from 'store/actions/boardsApi';

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
  const { addColumn, setCurrentColumns, sortColumns } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [currentCard, setCurrentCard] = useState(null) as any;

  const setAddColumn = () => {
    dispatch(addColumn(true));
  };

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, item: IAddAllColumns): void {
    setCurrentCard(item);
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, item: IAddAllColumns): void => {
    e.preventDefault();
    dispatch(
      setCurrentColumns(
        currentColumns.map((c: IAddAllColumns) => {
          if (c._id === item._id) {
            return { ...c, order: currentCard.order };
          }
          if (c._id === currentCard._id) {
            return { ...c, order: item.order };
          }
          return c;
        }),
      ),
    );
    dispatch(sortColumns());
    dispatch(setColumns(currentColumns));
  };

  return (
    <div className='columns__container'>
      <div className='columns__wrapper'>
        {currentColumns &&
          currentColumns.map((item: IAddAllColumns) => (
            <div
              key={item._id}
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, item)}
              // onDragLeave={(e) => dragEndHandler(e)}
              // onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
            >
              <Column key={item._id} item={item} />
            </div>
          ))}
        <Button variant='contained' sx={btnAddBoardStyle} onClick={setAddColumn}>
          <PostAddIcon sx={iconBtnStyle} />
          <Typography sx={textBtnStyle}>{t('boardPage.addColumnBtn')}</Typography>
        </Button>
      </div>
    </div>
  );
};
