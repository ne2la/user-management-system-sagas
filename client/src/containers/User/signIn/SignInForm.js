import React from 'react';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import "./signIn.css"
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';

const SignInForm = ({onSubmit}) => (
  <div>
    
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};

        // Email Validate

        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        
        // Password Validate

        if (!values.password) {
            errors.password = 'Required';
          } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(values.password)
          ) {
            errors.password = 'Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters and special characters!';
          }


          return errors;
        
        
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        onSubmit(values);
        setSubmitting(false)

      }}
    >
      {({
        isSubmitting
        /* and other goodies */
      }) => (
        <Form className="login-form">
        
          <Field type="email" name="email" className='regFormInput' placeholder="Email" style={{marginBottom:"5px",marginTop:"10px",padding:"3px 3px 3px 10px"}}/>
          <ErrorMessage name="email" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>
          
          <Field type="password" name="password" className='regFormInput' placeholder='Password' style={{marginBottom:"5px",marginTop:"10px",padding:"3px 3px 3px 10px"}}/>
          <ErrorMessage name="password" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>
          <Link className="login-form-forgot" to={"/forgotPassword"}>
            Forgot password
          </Link>

          <button type="submit" disabled={isSubmitting} className="login-form-button" style={{cursor:"pointer",marginTop:"10px",backgroundColor:"#1890ff",color:"white"}}>
            Log In
          </button>
          <Typography style={{paddingTop:"8px",fontWeight:"bold"}}> Or <Link  to="/register" style={{color:"#139c43"}}>register now!</Link></Typography>

          

        </Form>
      )}
    </Formik>
  </div>
);

export default SignInForm;