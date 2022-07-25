import {
    DO_FORGOT_PASSWORD_IN_PROGRESS,
    DO_FORGOT_PASSWORD_SUCCESS,
    DO_FORGOT_PASSWORD_FAILED
} from "../constants/constants";

const initialState = {
    inProgress: false,
    result: null,
    error: null
};

console.log(initialState)

export default function forgotPasswordReducer(state=initialState,action = {}){

    switch (action.type) {
        
        case DO_FORGOT_PASSWORD_IN_PROGRESS:
            return { ...initialState, inProgress: true };

        case DO_FORGOT_PASSWORD_SUCCESS:
            return { ...initialState, result: action.result };

        case DO_FORGOT_PASSWORD_FAILED:
            return { ...initialState, error: action.error };
            
        default:
             return initialState;
    }

}