import {
    DO_GET_USERS_IN_PROGRESS,
    DO_GET_USERS_SUCCESS,
    DO_GET_USERS_FAILED
} from "../constants/constants"

const initialState = {
    inProgress: false,
    allUsers: [],
    error: null,
};

export default function getUsersReducer(state = initialState, action = {}) {
    switch (action.type) {
        case DO_GET_USERS_IN_PROGRESS:
        return { ...initialState, inProgress: true };
        case DO_GET_USERS_SUCCESS:
        return { ...initialState, allUsers: action.result };
        case DO_GET_USERS_FAILED:
        return { ...initialState, error: action.error };

        default:
            return initialState;
    }
}