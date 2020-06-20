//root reducer tüm "store slice" oluşturan reducer'ların toplandığı yer
import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});