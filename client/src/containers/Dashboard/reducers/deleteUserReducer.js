import {
    DO_DELETE_USER_IN_PROGRESS,
    DO_DELETE_USER_SUCCESS,
    DO_DELETE_USER_FAILED
} from "../constants/constants"

const initialState = {
    inProgress: false,
    result: null,
    error: null,
};

export default function deleteUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DO_DELETE_USER_IN_PROGRESS:
        return { ...initialState, inProgress: true };
        case DO_DELETE_USER_SUCCESS:
        return { ...initialState, result: action.result };
        case DO_DELETE_USER_FAILED:
        return { ...initialState, error: action.error };

        default:
            return initialState;
    }
}

