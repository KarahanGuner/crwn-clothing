import React from 'react';
//this is a higher order component. it takes a component and wraps it.

import Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? <Spinner/> : <WrappedComponent {...otherProps}/> ;
};

export default WithSpinner;
