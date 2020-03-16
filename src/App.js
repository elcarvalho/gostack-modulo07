import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Globals from './styles/globals';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Globals />
    </BrowserRouter>
  );
}

export default App;
