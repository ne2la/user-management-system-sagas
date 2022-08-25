import React from 'react';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import "./register.css"
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';

const RegisterForm = ({onSubmit,setVerifyEmail}) => (
  <div>
    
    <Formik
      initialValues={{ 
        email: '', password: '',confirmPassword:'' 
    }}
      validate={values => {
        const errors = {};

        // // First Name Validate

        // if (!values.firstName) {
        //     errors.firstName = 'Required';
        // } else if (
        //     !/^[a-zA-Z]+$/.test(values.firstName)
        // ) {
        //     errors.firstName = 'Please input Valid Name!';
        // }

        // // Last Name Validate

        // if (!values.lastName) {
        //     errors.lastName = 'Required';
        // } else if (
        //     !/^[a-zA-Z]+$/.test(values.lastName)
        // ) {
        //     errors.lastName = 'Please input Valid Name!';
        // }
        
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

        // Confirm Password Validate

        if (!values.confirmPassword) {
            errors.confirmPassword= 'Required';
        } else if (
            values.password !== values.confirmPassword
        ) {
            errors.confirmPassword = 'Password not matched !';
        }


          return errors;
        
        
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        onSubmit(values);
        setVerifyEmail(values.email)
        setSubmitting(false)
        

      }}
    >
      {({
        isSubmitting
        /* and other goodies */
      }) => (
        <Form className='regForm'>

            {/* <label htmlFor="firstName" className="regFormItem">First Name</label> <br/>
            <Field id="firstName" type="text" name="firstName" className='regFormInput'/>
            <ErrorMessage name="firstName" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>

            <br/>
            <label htmlFor="lastName" className="regFormItem">Last Name</label> <br/>
            <Field id="lastName" type="text" name="lastName" className='regFormInput' />
            <ErrorMessage name="lastName" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/> */}

            <br/>        
            <label htmlFor="email" className="regFormItem">Email</label> <br/>
            <Field id="Email" type="email" name="email" className='regFormInput' />
            <ErrorMessage name="email" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>
          
            <br/>
            <label htmlFor="password" className="regFormItem"> Password </label> <br/>
            <Field type="password" name="password" className='regFormInput' />
            <ErrorMessage name="password" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>
            
            <br/>
            <label htmlFor="confirmPassword" className="regFormItem"> Confirm Password </label> <br/>
            <Field type="password" name="confirmPassword" className='regFormInput' />
            <ErrorMessage name="confirmPassword" component="div" style={{fontWeight:"bold",fontSize:"13px",paddingLeft:"10px",color:"#DC143C"}}/>

          <button type="submit" disabled={isSubmitting} className='regFormInput' style={{cursor:"pointer",marginTop:"20px",marginBottom:"5px",backgroundColor:"#1890ff",color:"white"}}>
            Register
          </button>

          <Typography className="regTypo"> Already have an account? <Link to="/signin"> Sign In </Link> </Typography>


        </Form>
      )}
    </Formik>
  </div>
);

export default RegisterForm;