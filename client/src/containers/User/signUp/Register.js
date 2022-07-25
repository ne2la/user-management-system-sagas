import React, { useEffect, useState } from 'react'
import { Alert, Button, Checkbox, Col, Divider, Form, Image, Input, Row, Typography,Modal } from 'antd';
import {Link} from "react-router-dom";
import "./register.css"
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { connect } from "react-redux";
import { doRegister, doRegisterFailed } from "../actions/registerActions";
import { createStructuredSelector } from "reselect";
import { Spin } from "antd";

import {
  register_error,
  register_inProgress,
  register_status,
} from "../selectors/registerSelectors";
import ModalComponent from '../../../components/modal/ModalComponent';

const Register = (props) => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
      console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // useEffect(() => {
  //   props.doRegisterFailed(null);
  // }, []);

  const[registerData,setRegisterData] = useState({
    firstName:'',lastName:'',email:'',password:'',confirmPassword:''
  })

  // const userRegister = async () => {
  //   try {
  //     const url = `http://localhost:5000/user/signup`
  //     const {data} = await axios.post(url,registerData);
  //     info(data)
  //   } catch (error) {
  //     errorModal(error)
  //     console.log(error)
  //   }
  // }

  // const info = (data) => {
  //   Modal.info({
  //     title: 'Notification',
  //     content: (
  //       <div>
  //         <p>{data?.message}</p>
  //       </div>
  //     ),

  //     onOk() {},
  //   });
  // };  

  // const errorModal = (error) => {
  //   Modal.error({
  //     title: 'Error',
  //     content: (
  //       <div>
  //         <p>{error}</p>
  //       </div>
  //     ),

  //     onOk() {},
  //   });
  // };  

  

  const handleSubmit = () => {

    // userRegister();
    
    props.doRegister(registerData);
    form.resetFields();
    // {props.register_inProgress && (
    //   <div style={{ margin: 10 }}>
    //     <Spin />
    //   </div>
    // )}
    
    // {props.register_error && props.register_error.message && (
    //   errorModal()
    // )}
    
    
  };

  // useEffect(() => {

  //   {props.register_error && props.register_error.message && (
  //     errorModal(props.register_error.message)
  //   )}

  // }, [props.register_error])

  // useEffect(() => {
  //   props.doRegisterFailed(null);
  // }, []); // New
  
  console.log(props.register_status)

  
  return (
    <section className='authSec1'>
    <div className='div1'>
      <Row>

        <Col span={12}> 
          <Image
            width="100%"
            height="100%"
            preview = {false} 
            className='formImg'
            src='https://img.freepik.com/free-vector/cartoon-character-filling-form-survey-checklist-man-writing-test-signing-business-medical-document-flat-illustration_74855-20483.jpg?t=st=1658225614~exp=1658226214~hmac=d54cbae1fbcfd3518abe5383551984cd260ed38a1c30d864a0f6707b896a8c16&w=900'
          />
        </Col>
        

        <Col span={12}>
          <Form
            name="register"
            form={form}
            className='regForm'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="First Name"
              name="First Name"
              className="regFormItem"
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
                {
                  pattern: new RegExp(/^[a-zA-Z]+$/),
                  message: 'Please input Valid Name!',
                },
              ]}
              hasFeedback
            >
              <Input className='regFormInput' value={registerData.firstName} onChange={(e) => setRegisterData({ ...registerData,firstName: e.target.value })}/>
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="Last Name"
              className="regFormItem"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
                {
                  pattern: new RegExp(/^[a-zA-Z]+$/),
                  message: 'Please input Valid Name!',
                },
              ]}
              hasFeedback
            >
              <Input className='regFormInput' value={registerData.lastName} onChange={(e) => setRegisterData({ ...registerData,lastName: e.target.value })}/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="Email"
              className="regFormItem"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
              hasFeedback
            >
              <Input className='regFormInput' value={registerData.email} onChange={(e) => setRegisterData({ ...registerData,email: e.target.value })}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="regFormItem"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
                  message: 'Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters and special characters!',
                },
              ]}
              hasFeedback
            >
              <Input.Password className='regFormInput' value={registerData.password} onChange={(e) => setRegisterData({ ...registerData,password: e.target.value })}/>
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="Confirm Password"
              className="regFormItem"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password className='regFormInput' value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData,confirmPassword: e.target.value })}/>
            </Form.Item>

            <Form.Item
            >
              <Button className='regFormInput' type="primary" htmlType="submit" size="large" shape="round">
                Register
              </Button>
              <Typography className="regTypo"> Already have an account? <Link to="/signin"> Sign In </Link> </Typography>
              
              {props.register_inProgress && (
                <div style={{ margin: 10 }}>
                  <Spin />
                </div>
              )}

              {props.register_error && props.register_error.message && (
                <ModalComponent type="error" data={props.register_error.message}/>
              )}

              {props.register_status && (
                <ModalComponent type="info" data={props.register_status}/>
              )}
            </Form.Item>

          </Form>

        </Col>
    </Row>
    </div>

    </section>
  )
}

const mapStateToProps = createStructuredSelector({
  register_inProgress: register_inProgress(),
  register_status: register_status(),
  register_error: register_error(),
});

const mapDispatchToProps = (dispatch) => ({
  doRegister: (payload) => {
    dispatch(doRegister(payload));
  },
  doRegisterFailed: (payload) => {
    dispatch(doRegisterFailed(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
