import React, { useState } from 'react';
import { Button, Input, Alert, Image,Form,Spin } from 'antd';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { doForgotPassword ,doForgotPasswordFailed } from "../actions/forgotPasswordAction";
import {
    forgotPassword_error,
    forgotPassword_result,
    forgotPassword_inProgress
} from "../selectors/forgotPasswordSelector";
import "../signIn/signIn.css"

const ForgotPassword = (props) => {

    const[forgotPasswordData,setForgotPasswordData] = useState({email:''});
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        props.doForgotPassword(forgotPasswordData);
    }

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
                    Get Reset Link
                </Button>

                <Link to={"/signin"}>
                    <Button style={{marginTop:"10px"}} type="primary" htmlType="submit" className="login-form-button">
                        Sign In
                    </Button>
                </Link>

                {props.forgotPassword_inProgress && (
                    <div style={{ margin: 10 }}>
                    <Spin />
                    </div>
                )}

                {props.forgotPassword_result && (
                    <Alert style={{marginTop:"20px",width:"350px"}} message={props.forgotPassword_result} type="success" showIcon/>
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
  });
  
const mapDispatchToProps = (dispatch) => ({

    doForgotPassword: (payload) => {
        dispatch(doForgotPassword(payload));
    },

    doForgotPasswordFailed: (payload) => {
        dispatch(doForgotPasswordFailed(payload));
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);