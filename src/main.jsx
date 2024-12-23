import { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { Song } from './components/Song.jsx';
import { Toaster } from 'react-hot-toast';
import { Favorites } from './components/Favorites.jsx';
import { Settings } from './components/Settings.jsx';
import { About } from './components/About.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <StrictMode>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/:id' element={<Song />} />
          <Route path='/' element={<App />} />
        </Routes>
      </StrictMode>
      <Toaster position='top-center' reverseOrder={false} />
    </Provider>
  </Router>
);
