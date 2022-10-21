import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AboutPage from './pages/about';
import ArticlePage from './pages/article';
import Enter from './pages/enter';
import HomePage from './pages/home';
import New from './pages/new';
import ReadingList from './pages/readingList';
import User from './pages/user';

function App() {
  return (<Router>
    <Routes>
    <Route path='/' element={< HomePage />}></Route>
      <Route path='/about' element={< AboutPage />}></Route>
      <Route path='/enter' element={< Enter status='signin'/>}></Route>
      <Route path='/register' element={< Enter status='signup' />}></Route>
      <Route path='/new' element={< New />}></Route>
      <Route path='/readinglist' element={< ReadingList />}></Route>
      {/* When all the router above is checked, then will the routes-with-params */}
      <Route path='/:username' element={< User />}></Route>
      <Route path='/:username/:title' element={< ArticlePage />}></Route>
    </Routes>
  </Router>

  );
}

export default App;
