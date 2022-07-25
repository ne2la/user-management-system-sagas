import {
    DO_ADD_USER_IN_PROGRESS,
    DO_ADD_USER_SUCCESS,
    DO_ADD_USER_FAILED
} from "../constants/constants"

const initialState = {
    inProgress: false,
    result: null,
    error: null,
};

export default function addUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DO_ADD_USER_IN_PROGRESS:
        return { ...initialState, inProgress: true };
        case DO_ADD_USER_SUCCESS:
        return { ...initialState, result: action.result };
        case DO_ADD_USER_FAILED:
        return { ...initialState, error: action.error };

        default:
            return initialState;
    }
}