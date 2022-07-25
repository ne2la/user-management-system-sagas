import React, { useEffect, useState } from 'react'
import { Checkbox,Button, Col, Divider, Form, Image, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import "./signIn.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { connect } from "react-redux";
import { doLogin,doLoginFailed } from "../actions/loginActions";
import { createStructuredSelector } from "reselect";
import { Spin } from "antd";
import {
  login_error,
  login_inProgress,
  login_loggedUser,
} from "../selectors/loginSelectors";
import ModalComponent from '../../../components/modal/ModalComponent';

const SignIn = (props) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [signInData,setSignInData] = useState({
      email:'',password:''
    });

    const navigateHandler = () => navigate("/");

    const handleSubmit = async () => {
      
      props.doLogin(signInData, navigateHandler);
      form.resetFields();
      
    }

    // useEffect(() => {

    //   {props.login_error && props.login_error.message && (
    //     errorModal(props.login_error.message)
    //   )}

    // }, [props.login_error])

    useEffect(() => {
      props.doLoginFailed(null);
    }, []); 
    // Error comes
    



  return (
    <>
    <section className='authSecSignIn1'>
    <div className='signInDiv1'> 

    <Row>
      <Col span={12}>
      <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email !',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
        hasFeedback
      >
        <Input value={signInData.email} onChange={(e) => setSignInData({ ...signInData,email: e.target.value })} className='regFormInput' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
            message: 'Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters and special characters!',
          },
        ]}
        hasFeedback
      >
        <Input
          className='regFormInput'
          value={signInData.password}
          onChange={(e) => setSignInData({ ...signInData,password: e.target.value })}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to={"/forgotPassword"}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Typography style={{paddingTop:"8px",fontWeight:"bold"}}> Or <Link  to="/register" style={{color:"#139c43"}}>register now!</Link></Typography>
        
        {props.login_inProgress && (
            <div style={{ margin: 10 }}>
              <Spin />
            </div>
        )}

        {props.login_error && props.login_error.message && (
          <ModalComponent type="error" data={props.login_error.message}/>
        )}

      </Form.Item>
    </Form>
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
