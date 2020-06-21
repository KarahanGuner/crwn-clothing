//store slice'ı oluşturan ve editleyen bir reducer. yolladığım action type'ına göre kullanıp içinde payload'la state'i değiştiriyor.
import { UserActionTypes} from './user.types.js'
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;