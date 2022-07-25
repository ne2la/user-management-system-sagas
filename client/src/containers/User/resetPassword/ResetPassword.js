import { Button, Form, Input, Modal, Typography } from 'antd';
import React, { useState,useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useLocation} from "react-router-dom";

import { doResetPassword ,doResetPasswordFailed } from "../actions/resetPasswordAction";
import { createStructuredSelector } from "reselect";
import { Spin } from "antd";
import { connect } from "react-redux";
import {
    resetPassword_error,
    resetPassword_result,
    resetPassword_inProgress
} from "../selectors/resetPasswordSelector";
import ModalComponent from '../../../components/modal/ModalComponent';

const ResetPassword = (props) => {

    const[resetPasswordData,setResetPasswordData] = useState({newPassword:''});
    const [form] = Form.useForm();
    const location = useLocation();

    const errorModal = (error) => {
      Modal.error({
        title: 'Error',
        content: (
          <div> 
            <p>{error}</p>
          </div>
        ),
  
        onOk() {},
      });
    };

    const infoModal = (data) => {
      Modal.info({
          title: 'Notification',
          content: (
          <div>
              <p>{data}</p>
          </div>
          ),

          onOk() {},
      });
  };  


    const handleSubmit = () => {
      props.doResetPassword({...resetPasswordData,path: location.pathname});
    }


  useEffect(() => {

      {props.resetPassword_result && (
        infoModal(props.resetPassword_result)
      )}

  }, [props.resetPassword_result])

  useEffect(() => {

      {props.resetPassword_error && props.resetPassword_error.message && (
        errorModal(props.resetPassword_error.message)
      )}

  }, [props.resetPassword_error])


  return (
    <>

    <Typography style={{fontSize:"20px",fontWeight:"bold", marginTop:"20px", textAlign:"center"}}> Enter New Password </Typography>

    <div style={{display:"flex",justifyContent:"center",marginTop:"0px"}}>
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
              <ModalComponent type="info" data={props.resetPassword_result}/>
            )}

            {props.resetPassword_error && props.resetPassword_error.message && (
              <ModalComponent type="error" data={props.resetPassword_error.message}/>
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

  // doForgotPasswordFailed: (payload) => {
  //     dispatch(doForgotPasswordFailed(payload));
  // },

});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);