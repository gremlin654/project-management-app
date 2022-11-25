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
import { Columns } from 'pages/Columns/Columns';

function App() {
  const { addBoardModal } = useAppSelector((state) => state.boardsSlice);

  return (
    <Suspense fallback={<Spinner />}>
      <div className='app'>
        <Header />
        <Routes>
          <Route path={PATH__ROUTES.MAIN} element={<Main />} />
          <Route path={PATH__ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={PATH__ROUTES.LOGIN} element={<Login />} />
          <Route path={PATH__ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={PATH__ROUTES.BOARDS} element={<Boards />} />
          <Route path={PATH__ROUTES.PROFILE} element={<Profile />} />
          <Route path={PATH__ROUTES.COLUMNS} element={<Columns />} />
        </Routes>
        <Footer />
        {addBoardModal && <AddBoard />}
      </div>
    </Suspense>
  );
}

export default App;
