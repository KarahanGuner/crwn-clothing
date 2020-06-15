import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => { // when we mount starts a listener and looks for changes in user and sets the state to changed user. when we equal auth.onAuthStateChanged to a variable and summon it later it stops listening.
      this.setState({currentUser: user});
    });
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();//stops listening when we close the component
  }
  render (){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch> 
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;
