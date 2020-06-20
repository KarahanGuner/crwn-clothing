//actions are functions that return objects. this is going to be dispatched
export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})