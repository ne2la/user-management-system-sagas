import { combineReducers } from "redux";

import loginReducer from "../containers/User/reducers/loginReducer";
import registerReducer from "../containers/User/reducers/registerReducer";
import forgotPasswordReducer from "../containers/User/reducers/forgotPasswordReducer";
import resetPasswordReducer from "../containers/User/reducers/resetPasswordReducer";
import getUsersReducer from "../containers/Dashboard/reducers/getUsersReducer";
import deleteUserReducer from "../containers/Dashboard/reducers/deleteUserReducer";
import addUserReducer from "../containers/Dashboard/reducers/addUserReducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  getUsersReducer,
  deleteUserReducer,
  addUserReducer
});

export default rootReducer;
