import {
    DO_GET_USERS_IN_PROGRESS,
    DO_GET_USERS_SUCCESS,
    DO_GET_USERS_FAILED,

    DO_DELETE_USER_IN_PROGRESS,
    DO_DELETE_USER_SUCCESS,
    DO_DELETE_USER_FAILED,

    DO_ADD_USER_IN_PROGRESS,
    DO_ADD_USER_SUCCESS,
    DO_ADD_USER_FAILED,

    DO_UPDATE_USER_IN_PROGRESS,
    DO_UPDATE_USER_SUCCESS,
    DO_UPDATE_USER_FAILED,

} from "../constants/constants";

const initialState = {
    inProgress: false,
    allUsers: [],
    errorGetUsers: null,
    errorAddUser: null,
    errorDeleteUser: null,
    errorUpdateUser: null,
    resultAddUser: null,
    resultDeleteUser: null,
    resultUpdateUser: null,
};

export default function userReducer(state = initialState, action = {}) {
    
    switch (action.type) {
        
        case DO_GET_USERS_IN_PROGRESS:
        case DO_DELETE_USER_IN_PROGRESS:
        case DO_ADD_USER_IN_PROGRESS:
        case DO_UPDATE_USER_IN_PROGRESS:
            return {
                ...state,
                inProgress: true,
            };
            
        case DO_GET_USERS_SUCCESS:
            return { ...state, allUsers: action.result, inProgress:false };

        case DO_DELETE_USER_SUCCESS:
            return { ...state, resultDeleteUser: action.result, inProgress:false};  
        case DO_ADD_USER_SUCCESS: 
            return { ...state, resultAddUser: action.result,inProgress:false};  
        case DO_UPDATE_USER_SUCCESS:
            return { ...state, resultUpdateUser: action.result, inProgress:false};      

        case DO_GET_USERS_FAILED:
            return { ...state, errorGetUsers: action.error, inProgress:false };
        case DO_DELETE_USER_FAILED:
            return { ...state, errorDeleteUser: action.error, inProgress:false };
        case DO_ADD_USER_FAILED:
            return { ...state, errorAddUser: action.error, inProgress:false };
        case DO_UPDATE_USER_FAILED:
            return { ...state, errorUpdateUser: action.error, inProgress:false };

        default:
            return initialState;
    }
}
