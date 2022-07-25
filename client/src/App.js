import {Route,BrowserRouter as Router,Routes, Navigate, useLocation} from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes"
import Home from "./containers/Dashboard/home/Home"
import ForgotPassword from "./containers/User/forgotPassword/ForgotPassword";
import ResetPassword from "./containers/User/resetPassword/ResetPassword";
import SignIn from "./containers/User/signIn/SignIn"
import Register from "./containers/User/signUp/Register"
import VerifiedEmail from "./containers/User/verifiedEmail/VerifiedEmail"  

function App() {
  return (
    <>
      <Router>

        <Routes>

          <Route element={<ProtectedRoutes/>}>
            <Route path='/' exact element={<Home/>}/>
          </Route>

          <Route path='/signin' exact element={<SignIn/>}/>
          <Route path='/register' exact element={<Register/>}/>
          <Route path='/confirmEmail/:id/:token' exact element={<VerifiedEmail/>}/>
          <Route path='/forgotPassword' exact element={<ForgotPassword/>}/>
          <Route path='/resetPassword/:id/:token' exact element={<ResetPassword/>}/>

          
  
        </Routes>

      </Router>  
    </>
  );
}

export default App;
