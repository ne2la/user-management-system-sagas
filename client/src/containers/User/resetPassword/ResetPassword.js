import React, { useState } from 'react'
import { Alert, Button, Form, Image, Input,Spin } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {Link, useLocation} from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { doResetPassword  } from "../actions/resetPasswordAction";
import {
    resetPassword_error,
    resetPassword_result,
    resetPassword_inProgress
} from "../selectors/resetPasswordSelector";

const ResetPassword = (props) => {

    const[resetPasswordData,setResetPasswordData] = useState({newPassword:''});
    const [form] = Form.useForm();
    const location = useLocation();


    const handleSubmit = () => {
      props.doResetPassword({...resetPasswordData,path: location.pathname});
    }

  return (
    <>

    <div style={{display:"flex",justifyContent:"center",marginTop:"0px",flexDirection:"column",alignItems:"center",marginTop:"30px"}}>
      
      <Image
          width="400px"
          height="410px"
          preview = {false} 
          className='formImg'
          src='https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7896.jpg?t=st=1658845264~exp=1658845864~hmac=d5ec0bcec0c0ad1d9c3aa64db5367afc1fafc508af4daaf9bab922e7002c8ad2&w=740'
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

        <Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
                Reset Password
            </Button>

            <Link to={"/signin"}>
              <Button style={{marginTop:"10px"}} type="primary" htmlType="submit" className="login-form-button">
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

      </Form>
    </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  resetPassword_inProgress: resetPassword_inProgress(),
  resetPassword_error: resetPassword_error(),
  resetPassword_result: resetPassword_result(),
});

const mapDispatchToProps = (dispatch) => ({
  doResetPassword: (payload) => {
      dispatch(doResetPassword(payload));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);