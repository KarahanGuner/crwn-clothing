import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // when we mount starts a listener and looks for changes in user and sets the state to changed user. when we equal auth.onAuthStateChanged to a variable and summon it later it stops listening.
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        //like .get but installs a listener
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();//stops listening when we close the component
  }
  render (){
    return (
      <div>
        <Header />
        <Switch> 
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({//bu actionla ilgileniyo mapStateToProps reducer'la.
  setCurrentUser: user => dispatch(setCurrentUser(user)) //LHS setCurrentUser is the one we are using in the App, RHS is the one we imported
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
