import { combineReducers } from "redux";

import loginReducer from "../containers/User/reducers/loginReducer";
import registerReducer from "../containers/User/reducers/registerReducer";
import forgotPasswordReducer from "../containers/User/reducers/forgotPasswordReducer";
import resetPasswordReducer from "../containers/User/reducers/resetPasswordReducer";
import userReducer from "../containers/Dashboard/reducers/userReducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userReducer
});

export default rootReducer;
