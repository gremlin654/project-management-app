import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Registration } from 'pages/Registration/Registration';
import { Main } from 'pages/Main/Main';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router';
import { PATH__ROUTES } from 'utils/path_routes';
import './App.scss';
import { Login } from 'pages/Login/Login';
import { Board } from 'pages/Board/Board';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path={PATH__ROUTES.MAIN} element={<Main />} />
        <Route path={PATH__ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={PATH__ROUTES.LOGIN} element={<Login />} />
        <Route path={PATH__ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={PATH__ROUTES.BOARDS} element={<Board />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
