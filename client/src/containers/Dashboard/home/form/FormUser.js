import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import FileBase from "react-file-base64";
import "./formikForm.css";
import {doAddUser,doUpdateUser} from "../../actions/userAction";
import {
    getUsers_inProgress,
    getUsers_allUsers,
    getUsers_error,
    deleteUser_result,
    deleteUser_error,
    addUser_error,
    addUser_inProgress,
    addUser_result,
} from "../../selectors/userSelector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Alert, notification, Spin } from 'antd';

const FormUser = (props) => {

    const {postData,setPostData,setVisible} = props;

    var initialValuesForm = {
        userName:"",
        userEmail:"",
        NIC:"",
        occupation:'',
        userImage:''
    }

    // console.log(postData)

    const handleSubmit = (values) => {

        if(values.id){
          props.doUpdateUser(
            {
              userName: values.userName, userEmail: values.userEmail,
              NIC: values.NIC, occupation: values.occupation,
              userImage: values.userImage
            },
            values.id,
            getNotificationUpdate)  
        }else{
          props.doAddUser(values,getNotification);
        }
    
      }
    
      const getNotification = () => {
        notification["success"](
          {
            message: 'User Created Successfully',
            placement:"bottom"
          }
        )
    
        setVisible(false)
        setPostData(null)
      }
    
      const getNotificationUpdate = () => {
        notification["success"](
          {
            message: 'User Updated Successfully',
            placement:"bottom"
          }
        )
    
        setVisible(false)
        setPostData(null)
      }


    const formik = useFormik({
        initialValues: postData || initialValuesForm,
        enableReinitialize: true,
        validationSchema: Yup.object({
            userName: Yup.string().required("Required").matches(/^[a-zA-Z ]+$/,"Please input Valid Name!"),
            userEmail: Yup.string().email('Invalid email address').required("Required"),
            NIC: Yup.string().required("Required").matches(/^[0-9]{12}$/,"Please input Valid NIC!!"),
            occupation: Yup.string().required("Required").matches(/^[a-zA-Z ]+$/,"Please input Valid Occupation!"),
            userImage: Yup.string().required("Required")

        }),
        onSubmit: (values,{resetForm}) => {
            handleSubmit(values);
            resetForm()
        }
        
        
    });

    // console.log(formik.values)

  return (
    <>
    <form className='formC' onSubmit={formik.handleSubmit}>

        <div className='formRows'>

        <div className='formCols'>
            <label className='formLabels' htmlFor="firstName"> Name : </label>
            <div className='colContainer'>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    className='formInputs'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                /> 
                <div className='errMsg'> {formik.touched.userName && formik.errors.userName ? <p> {formik.errors.userName} </p> : null} </div>
            </div>
        </div>
        
        <div className='formCols'>
            <label className='formLabels' htmlFor="lastName">Email : </label>
            <div className='colContainer'>
            <input
                id="userEmail"
                name="userEmail"
                type="email"
                className='formInputs'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userEmail}
            />
            <div className='errMsg'> {formik.touched.userEmail && formik.errors.userEmail ? <p> {formik.errors.userEmail} </p> : null} </div>
            </div>
        </div>

        <div className='formCols'>
            <label className='formLabels' htmlFor="email">NIC : </label>
            <div className='colContainer'>
            <input
                id="NIC"
                name="NIC"
                type="text"
                className='formInputs'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.NIC}
            />
            <div className='errMsg'> {formik.touched.NIC && formik.errors.NIC ? <p> {formik.errors.NIC} </p> : null} </div>
            </div>
        </div>

        <div className='formCols'>
            <label className='formLabels' htmlFor="email">Occupation : </label>
            <div className='colContainer'>
            <input
                id="occupation"
                name="occupation"
                type="text"
                className='formInputs'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.occupation}
            />
            <div className='errMsg'> {formik.touched.occupation && formik.errors.occupation ? <p> {formik.errors.occupation} </p> : null} </div>
            </div>
        </div>

        <div className='formCols'>
            <label className='formLabels' htmlFor="userImage"> User Image : </label>
            <div className='colContainer'>
            <FileBase
                type="file"
                multiple={false}
                onDone={({base64}) => formik.setFieldValue("userImage",base64)}
            />
            </div>
        </div>

        </div>

        <div className='formikBtn'>
            <button type="reset" onClick={formik.resetForm} style={{cursor:"pointer",backgroundColor:"#D2691E" ,color: "white"}}>Reset</button>
            <button type="submit" style={{cursor:"pointer",backgroundColor:"#1890ff",color:"white",fontWeight:"lighter"}}>Submit</button>
        </div>

        {props.addUser_error && props.addUser_error.message && (
            <Alert style={{marginTop:"10px"}} message={props.addUser_error.message} type="error" showIcon/>
        )}

        {props.addUser_inProgress && (
            <div style={{ margin: 10, marginLeft:"50%", marginTop:"5%" }}>
                <div>
                <Spin size="large"/>
                </div>
            </div>
        )}
        
        

    </form>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
    getUsers_inProgress: getUsers_inProgress(),
    getUsers_error: getUsers_error(),
    getUsers_allUsers: getUsers_allUsers(),
    deleteUser_result: deleteUser_result(),
    deleteUser_error: deleteUser_error(),
    addUser_inProgress: addUser_inProgress(),
    addUser_error: addUser_error(),
    addUser_result: addUser_result(),
  });
  
  const mapDispatchToProps = (dispatch) => ({
    
  
  doAddUser: (payload,callback) => {
    dispatch(doAddUser(payload,callback));
  },
  
  doUpdateUser: (payload,id,callback) => {
    dispatch(doUpdateUser(payload,id,callback));
  }
  
  });
  
  export default connect(mapStateToProps,mapDispatchToProps)(FormUser);