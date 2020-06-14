import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';


function App() {
  return (
    <div>
      <Header/>
      <Switch> //stops loading others after the first match with switch and no exacts, /hats url would only render HomePage}
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
