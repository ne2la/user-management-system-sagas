import { Alert, Spin } from 'antd';
import { Formik, Form, Field,} from 'formik';
import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import { doVerifyEmail } from "../actions/verifyEmail";
import {
  verifyEmail_error,
  verifyEmail_inProgress,
  verifyEmail_result,
} from "../selectors/verifyEmailSelector";

const VerifyEmail = (props) => {

  const onSubmit = values => {
    props.doVerifyEmail(values);
    console.log(values)
  }
  
  return (
    <>
    <Formik
      initialValues={{ 
        email:props.verifyEmail,verificationCode:'' 
    }}

      onSubmit={(values, { setSubmitting }) => {
        
        onSubmit(values);
        setSubmitting(false)

      }}
    >
      {({
        isSubmitting
        /* and other goodies */
      }) => (
        <Form className='regForm'>
    
            {/* <label htmlFor="email" className="regFormItem">Email</label>
            <Field id="Email" type="email" name="email" className='regFormInput' /> */}

            <label htmlFor="verificationCode" className="regFormItem">Verification Code</label><br/>
            <Field id="verificationCode" type="text" name="verificationCode" className='regFormInput' />

            <button type="submit" disabled={isSubmitting} className='regFormInput' style={{cursor:"pointer",marginTop:"10px",marginBottom:"5px",backgroundColor:"#1890ff",color:"white"}}>
              Verify
            </button>

            {/* {props.verifyEmail_inProgress && (
              <div style={{ margin: 10 }}>
                <Spin />
              </div>
            )}

            {props.verifyEmail_result && (
              <>
                <Alert style={{margin:"10px 0px 10px 30px",width:"290px"}} message={props.verifyEmail_result} type="success" showIcon/>
                <Link to="/signin" style={{fontWeight:"bold",color:"#139c43",paddingLeft:"60px"}}>
                  Sign In
                </Link>
              </>
            )}

            {props.verifyEmail_error && props.verifyEmail_error.message && (
              <>
              <Alert style={{margin:"10px 0px 10px 30px",width:"290px"}} message={props.verifyEmail_error.message} type="error" showIcon/>
              <Link to="/register" style={{fontWeight:"bold",color:"#139c43",paddingLeft:"60px"}}>
                Register
              </Link>
              </>
            )} */}




        </Form>
      )}
    </Formik>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  verifyEmail_inProgress: verifyEmail_inProgress(),
  verifyEmail_result: verifyEmail_result(),
  verifyEmail_error: verifyEmail_error(),
});

const mapDispatchToProps = (dispatch) => ({
  doVerifyEmail: (payload) => {
    dispatch(doVerifyEmail(payload));
  },
  
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);