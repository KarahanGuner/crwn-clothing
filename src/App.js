import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // when we mount starts a listener and looks for changes in user and sets the state to changed user. when we equal auth.onAuthStateChanged to a variable and summon it later it stops listening.
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        //like .get but installs a listener
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
        
      } else {
        this.setState({currentUser: userAuth});
      }
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
