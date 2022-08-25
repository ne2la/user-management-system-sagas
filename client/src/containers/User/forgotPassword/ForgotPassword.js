import React, { useState } from 'react';
import { Button, Input, Alert, Image,Form,Spin } from 'antd';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { doForgotPassword ,doForgotPasswordFailed } from "../actions/forgotPasswordAction";
import {
    forgotPassword_error,
    forgotPassword_result,
    forgotPassword_inProgress
} from "../selectors/forgotPasswordSelector";

import { doResetPassword  } from "../actions/resetPasswordAction";
import {
    resetPassword_error,
    resetPassword_result,
    resetPassword_inProgress
} from "../selectors/resetPasswordSelector";

import "../signIn/signIn.css"

const ForgotPassword = (props) => {

    const[forgotPasswordData,setForgotPasswordData] = useState({email:''});
    const[resetPasswordData,setResetPasswordData] = useState({newPassword:'',verificationCode:''});
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        props.doForgotPassword(forgotPasswordData);
    }

    const onClickReset = () => {
        props.doResetPassword({resetPasswordData,email:forgotPasswordData.email})
        
    }

    console.log({resetPasswordData,email:forgotPasswordData.email})

  return (
    <>
    
    <div style={{display:"flex",justifyContent:"center",marginTop:"0px",flexDirection:"column",alignItems:"center",marginTop:"30px"}}>
        
        <Image
            width="400px"
            height="410px"
            preview = {false} 
            className='formImg'
            src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?t=st=1658843356~exp=1658843956~hmac=6ad85232fb1371f362c1afde0705542edb5fa2c38d01a0fe60fdf5e150b78e7f&w=740'
        />

        <Form
            form={form}
            name="normal_login"
            className="login-form"
            style={{paddingTop:"20px"}}
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
                <Input value={forgotPasswordData.email} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData,email: e.target.value })} className='regFormInput' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item>

                <Button type="primary" htmlType="submit" className="login-form-button">
                    Get Reset Code
                </Button>

                {/* <Link to={"/signin"}>
                    <Button style={{marginTop:"10px"}} type="primary" htmlType="submit" className="login-form-button">
                        Sign In
                    </Button>
                </Link> */}

                {props.forgotPassword_inProgress && (
                    <div style={{ margin: 10 }}>
                    <Spin />
                    </div>
                )}

                {props.forgotPassword_result && (
                    <>
                    <Alert style={{marginTop:"20px",width:"350px",marginBottom:"10px"}} message={props.forgotPassword_result} type="success" showIcon/>
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
            value={resetPasswordData.newPassword}
            onChange={(e) => setResetPasswordData({ ...resetPasswordData,newPassword: e.target.value })}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />

        </Form.Item>

        <Form.Item
          name="verificationCode"
          rules={[
            {
              required: true,
              message: 'Please input your Verification Code!',
            },
          ]}
          hasFeedback
        >

          <Input
            className='regFormInput'
            value={resetPasswordData.verificationCode}
            onChange={(e) => setResetPasswordData({ ...resetPasswordData,verificationCode: e.target.value })}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Verification Code"
          />

            <Button onClick={onClickReset} type="primary" className="login-form-button" style={{marginTop:"20px"}}>
                Reset Password
            </Button>

            <Link to={"/signin"}>
                    <Button style={{marginTop:"10px"}} type="primary" className="login-form-button">
                        Sign In
                    </Button>
                </Link>

            {props.resetPassword_inProgress && (
                <div style={{ margin: 10 }}>
                  <Spin />
                </div>
            )}

            {props.resetPassword_result && (
              <Alert style={{marginTop:"10px"}} message={props.resetPassword_result} type="success" showIcon/>
            )}

            {props.resetPassword_error && props.resetPassword_error.message && (
              <Alert style={{marginTop:"10px"}} message={props.resetPassword_error.message} type="error" showIcon/>
            )}

            


        </Form.Item>

                </>
                )}

                {props.forgotPassword_error && props.forgotPassword_error.message && (
                    <Alert style={{marginTop:"20px"}} message={props.forgotPassword_error.message} type="error" showIcon/>
                )}
       
            </Form.Item>

        </Form>
    </div>
    </>
  )
};

const mapStateToProps = createStructuredSelector({
    forgotPassword_inProgress: forgotPassword_inProgress(),
    forgotPassword_error: forgotPassword_error(),
    forgotPassword_result: forgotPassword_result(),

    resetPassword_inProgress: resetPassword_inProgress(),
    resetPassword_error: resetPassword_error(),
    resetPassword_result: resetPassword_result(),

  });
  
const mapDispatchToProps = (dispatch) => ({

    doForgotPassword: (payload) => {
        dispatch(doForgotPassword(payload));
    },

    doForgotPasswordFailed: (payload) => {
        dispatch(doForgotPasswordFailed(payload));
    },

    doResetPassword: (payload) => {
        dispatch(doResetPassword(payload));
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);