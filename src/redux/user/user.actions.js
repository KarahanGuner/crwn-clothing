//actions are functions that return objects. this is going to be dispatched
import {UserActionTypes} from './user.types';
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})