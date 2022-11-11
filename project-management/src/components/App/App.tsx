import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Main } from 'pages/Main/Main';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router';
import { PATH__ROUTES } from 'utils/constants';
import './App.scss';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path={PATH__ROUTES.MAIN} element={<Main />} />
        <Route path={PATH__ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
