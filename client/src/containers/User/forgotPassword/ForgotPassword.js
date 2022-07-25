import { Button, Input, Typography,Modal } from 'antd'
import React, { useState,useEffect } from 'react'
import {Form} from "antd"
import { UserOutlined } from '@ant-design/icons';
import { doForgotPassword ,doForgotPasswordFailed } from "../actions/forgotPasswordAction";
import { createStructuredSelector } from "reselect";
import { Spin } from "antd";
import { connect } from "react-redux";
import {
    forgotPassword_error,
    forgotPassword_result,
    forgotPassword_inProgress
} from "../selectors/forgotPasswordSelector";
import ModalComponent from '../../../components/modal/ModalComponent';
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {

    const[forgotPasswordData,setForgotPasswordData] = useState({email:''});
    const [form] = Form.useForm();

    // const errorModal = (error) => {
    //     Modal.error({
    //       title: 'Error',
    //       content: (
    //         <div> 
    //           <p>{error}</p>
    //         </div>
    //       ),
    
    //       onOk() {},
    //     });
    //   };

    // const infoModal = (data) => {
    //     Modal.info({
    //         title: 'Notification',
    //         content: (
    //         <div>
    //             <p>{data}</p>
    //         </div>
    //         ),

    //         onOk() {},
    //     });
    // };  

    const handleSubmit = async () => {
        props.doForgotPassword(forgotPasswordData);
    }

    // useEffect(() => {

    //     {props.forgotPassword_result && (
    //       infoModal(props.forgotPassword_result)
    //     )}
  
    // }, [props.forgotPassword_result])

    // useEffect(() => {

    //     {props.forgotPassword_error && props.forgotPassword_error.message && (
    //       errorModal(props.forgotPassword_error.message)
    //     )}
  
    // }, [props.forgotPassword_error])

    //new

    // useEffect(() => {
    //   props.doForgotPasswordFailed(null);
    // }, []);


  return (
    <>
    <Typography style={{fontSize:"20px",fontWeight:"bold", marginTop:"20px", textAlign:"center"}}> Enter Your Email </Typography>
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
                    <ModalComponent type="info" data={props.forgotPassword_result}/>
                )}

                {props.forgotPassword_error && props.forgotPassword_error.message && (
                    <ModalComponent type="error" data={props.forgotPassword_error.message}/>
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