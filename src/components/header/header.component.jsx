import React from 'react';
import {connect} from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import {signOutStart} from '../../redux/user/user.actions';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles.jsx';

const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
           <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : (<CartDropdown/>) 
        }
        
    </HeaderContainer>
);

const mapStateToProps = state => ({ //function that allows us to access the state.
    //currentUser on the LHS is the one in line 8. state is rootreducer. state.user is the user reducer. and the currentUser in the RHS is the prop in user reducer .
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header); // connect may take two parameters and in return gives us another higher order function which then when we pass the Header component into we get state from the store.