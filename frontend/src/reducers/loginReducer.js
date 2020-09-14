export const initialState =  {
    isAuthenticated: false
}



export const loginReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": {
            return {
                isAuthenticated: true
            }
        }
        case "LOGOUT": {
            return {
                isAuthenticated: false
            }
        }
        default: {
            return state;
        }
    }
}