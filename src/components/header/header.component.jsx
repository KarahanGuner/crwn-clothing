import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
           <Logo className='logo'/>
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
);

const mapStateToProps = state => ({ //function that allows us to access the state.
    //currentUser on the LHS is the one in line 8. state is rootreducer. state.user is the user reducer. and the currentUser in the RHS is the prop in user reducer .
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header); // connect may take two parameters and in return gives us another higher order function which then when we pass the Header component into we get state from the store.