import React, {useState } from 'react'
import { Alert, Button, Col, Form, Image, Input, Row, Typography,Spin } from 'antd';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { doRegister, doRegisterFailed } from "../actions/registerActions";
import {
  register_error,
  register_inProgress,
  register_status,
} from "../selectors/registerSelectors";
import "./register.css"
import RegisterForm from './RegisterForm';

const Register = (props) => {

  const [form] = Form.useForm();

  const[registerData,setRegisterData] = useState({
    firstName:'',lastName:'',email:'',password:'',confirmPassword:''
  })

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const handleSubmit = () => {

  //   props.doRegister(registerData);
  //   form.resetFields();
    
  // }

  const onSubmit = values => {
    props.doRegister(values);
    console.log(values)
  }

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
            
            <RegisterForm onSubmit={onSubmit}/>

            {props.register_inProgress && (
              <div style={{ margin: 10 }}>
                <Spin />
              </div>
            )}

            {props.register_error && props.register_error.message && (
              <Alert style={{margin:"10px 0px 10px 30px",width:"290px"}} message={props.register_error.message} type="error" showIcon/>
            )}

            {props.register_status && (
              <Alert style={{margin:"10px 0px 10px 30px",width:"290px"}} message={props.register_status} type="success" showIcon/>
            )}


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
