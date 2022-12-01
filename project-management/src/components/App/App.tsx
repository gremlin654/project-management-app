import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Registration } from 'pages/Registration/Registration';
import { Main } from 'pages/Main/Main';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { PATH__ROUTES } from 'utils/path_routes';
import './App.scss';
import { Login } from 'pages/Login/Login';
import { Profile } from 'pages/Profile/Profile';
import { AddBoard } from 'components/AddBoard/AddBoard';
import { useAppSelector } from 'hooks/redux';
import Boards from 'pages/Boards/Boards';
import { Spinner } from 'components/Spinner/Spinner';
import { BoardPage } from 'pages/BoardPage/BoardPage';
import { BoardModal } from 'components/BoardModal/BoardModal';
import { SpinnerBoard } from 'components/SpinnerBoard/SpinnerBoard';
import { DeleteModal } from 'components/DeleteModal/DeleteModal';

function App() {
  const {
    addBoardModal,
    isAddColumn,
    isAddTask,
    isLoadingBoard,
    isDeleteBoard,
    isDeleteColumn,
    isDeleteTask,
    isChangeTask,
  } = useAppSelector((state) => state.boardsSlice);

  return (
    <Suspense fallback={<Spinner />}>
      <div className='app'>
        <Header />
        <Routes>
          <Route path={PATH__ROUTES.WELCOME} element={<Main />} />
          <Route path={PATH__ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={PATH__ROUTES.LOGIN} element={<Login />} />
          <Route path={PATH__ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={PATH__ROUTES.BOARDS} element={<Boards />} />
          <Route path={PATH__ROUTES.PROFILE} element={<Profile />} />
          <Route path={PATH__ROUTES.BOARD_PAGE} element={<BoardPage />} />
        </Routes>
        <Footer />
        {addBoardModal && <AddBoard />}
        {isAddColumn && <BoardModal />}
        {isAddTask && <BoardModal />}
        {isChangeTask && <BoardModal />}
        {isDeleteColumn && <DeleteModal />}
        {isDeleteBoard && <DeleteModal />}
        {isDeleteTask && <DeleteModal />}
        {isLoadingBoard && <SpinnerBoard />}
      </div>
    </Suspense>
  );
}

export default App;
