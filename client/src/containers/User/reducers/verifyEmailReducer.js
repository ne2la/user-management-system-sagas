import {
    DO_VERIFY_EMAIL_IN_PROGRESS,
    DO_VERIFY_EMAIL_SUCCESS,
    DO_VERIFY_EMAIL_FAILED
} from "../constants/constants";

const initialState = {
    inProgress: false,
    result: null,
    error: null
};

export default function verifyEmailReducer(state=initialState,action = {}){

    switch (action.type) {
        
        case DO_VERIFY_EMAIL_IN_PROGRESS:
            return { ...initialState, inProgress: true };

        case DO_VERIFY_EMAIL_SUCCESS:
            return { ...initialState, result: action.result };

        case DO_VERIFY_EMAIL_FAILED:
            return { ...initialState, error: action.error };
            
        default:
             return initialState;
    }

}