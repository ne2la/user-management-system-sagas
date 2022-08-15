import React, { useEffect, useState } from 'react'
import { Checkbox,Button, Col, Form, Image, Input, Row, Typography, Alert,Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { doLogin,doLoginFailed } from "../actions/loginActions";
import {
  login_error,
  login_inProgress,
  login_loggedUser,
} from "../selectors/loginSelectors";
import "./signIn.css"
import SignInForm from './SignInForm';

const SignIn = (props) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [signInData,setSignInData] = useState({
      email:'',password:''
    });

    useEffect(() => {
      props.doLoginFailed(null);
    }, []); 

    const navigateHandler = () => navigate("/");

    const handleSubmit = async () => {
      
      props.doLogin(signInData, navigateHandler);
      form.resetFields();
      
    }

    // Class Component => Doc

    const onSubmit = values => {
      props.doLogin(values, navigateHandler);
      console.log(values)
    }
  
    
  return (
    <>
    <section className='authSecSignIn1'>
      <div className='signInDiv1'> 

        <Row>
          <Col span={12}>

            <SignInForm onSubmit={onSubmit}/>

            {props.login_inProgress && (
              <div style={{ margin: 10 }}>
                <Spin />
              </div>
            )}

            {props.login_error && props.login_error.message && (
              <Alert style={{margin:"10px 0px 0px 30px",width:"290px"}} message={props.login_error.message} type="error" showIcon/>
            )}

          </Col>

          <Col span={12}> 
            <Image
              width="100%"
              height="410px"
              preview = {false} 
              className='formImg'
              src='https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?w=826'
            />
          </Col>

        </Row>

      </div>
    </section>
    
    </>
  )
};

const mapStateToProps = createStructuredSelector({
  login_inProgress: login_inProgress(),
  login_error: login_error(),
  login_loggedUser: login_loggedUser(),
});

const mapDispatchToProps = (dispatch) => ({
  
  doLogin: (payload, callback) => {
    dispatch(doLogin(payload, callback));
  },

  doLoginFailed: (payload) => {
    dispatch(doLoginFailed(payload));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
