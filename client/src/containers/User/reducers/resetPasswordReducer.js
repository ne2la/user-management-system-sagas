import {
    DO_RESET_PASSWORD_IN_PROGRESS,
    DO_RESET_PASSWORD_SUCCESS,
    DO_RESET_PASSWORD_FAILED
} from "../constants/constants";

const initialState = {
    inProgress: false,
    result: null,
    error: null
};

export default function resetPasswordReducer(state=initialState,action = {}){

    switch (action.type) {
        
        case DO_RESET_PASSWORD_IN_PROGRESS:
            return { ...initialState, inProgress: true };

        case DO_RESET_PASSWORD_SUCCESS:
            return { ...initialState, result: action.result };

        case DO_RESET_PASSWORD_FAILED:
            return { ...initialState, error: action.error };
            
        default:
             return initialState;
    }

}