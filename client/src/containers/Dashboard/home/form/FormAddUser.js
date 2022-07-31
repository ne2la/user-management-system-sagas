import React, { useEffect} from 'react';
import {
    Button,
    Form,
    Input, 
    Alert,
    notification
} from 'antd';
import FileBase from "react-file-base64";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { doAddUser,doAddUserFailed,doUpdateUser,doGetUsers } from "../../actions/userAction";
import {
  addUser_error,
  addUser_inProgress,
  addUser_result,
  getUsers_inProgress
} from "../../selectors/userSelector";


const FormAddUser = (props) => {

  const {postData,setPostData,form} = props;

  const defaultValues = {
    ["Name"]: postData.userName,
    ["Email"]: postData.userEmail,
    ["NIC"]: postData.NIC,
    ["Occupation"]: postData.occupation,
    ["UserImg"]: postData.userImage,
  }

  useEffect(() => {
    form.setFieldsValue(defaultValues)
  }, [defaultValues])

  const getNotification = () => {
    notification["success"](
      {
        message: 'User Created Successfully',
        placement:"bottom"
      }
    )

    handleClear()
    props.setVisible(false)
  }

  const getNotificationUpdate = () => {
    notification["success"](
      {
        message: 'User Updated Successfully',
        placement:"bottom"
      }
    )

    handleClear()
    props.setVisible(false)
  }

  const handleClear = () => {
    setPostData({})
  }

  const handleSubmit = () => {

    if(postData._id){
      props.doUpdateUser(postData,getNotificationUpdate)  
    }else{
      props.doAddUser(postData,getNotification);
    }

  }

  return (
    <>
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={defaultValues}
      size="default"
      onFinish={handleSubmit}
    >

      <Form.Item 
        label="Name"
        name="Name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
          {
            pattern: new RegExp(/^[a-zA-Z ]+$/),
            message: 'Please input Valid Name!',
          },
        ]}
        hasFeedback
      >
        <Input value={postData.userName} onChange={(e) => setPostData({ ...postData,userName: e.target.value })}/>
      </Form.Item>

      <Form.Item 
        label="Email"
        name="Email"
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
        <Input value={postData.userEmail} onChange={(e) => setPostData({ ...postData,userEmail: e.target.value })}/>
      </Form.Item>

      <Form.Item 
        label="NIC"
        name="NIC"
        rules={[
          {
            required: true,
            message: 'Please input your NIC!',
          },
          {
            pattern: new RegExp(/^[0-9]{12}$/),
            message: 'Please input Valid NIC!',
          },
        ]}
        hasFeedback
      
      >
        <Input value={postData.NIC} onChange={(e) => setPostData({ ...postData,NIC: e.target.value })}/>
      </Form.Item>

      <Form.Item 
        label="Occupation"
        name="Occupation"
        rules={[
          {
            required: true,
            message: 'Please input your Occupation!',
          },
          {
            pattern: new RegExp(/^[a-zA-Z ]+$/),
            message: 'Please input Valid Occupation!',
          },
        ]}
        hasFeedback
      >
        <Input value={postData.occupation} onChange={(e) => setPostData({ ...postData,occupation: e.target.value })}/>
      </Form.Item>

      <Form.Item
       label="UserImg"
       name="UserImg"
       rules={[
         {
           required: true,
           message: 'Please input your Image!',
         },
       ]}
       hasFeedback
      >
      <FileBase
        type="file"
        multiple={false}
        onDone={({base64}) => setPostData({ ...postData,userImage:base64})}
      />

      </Form.Item>

      <div style={{display:"flex", gap:"10px", alignItems:"center",justifyContent:"right"}}>
        <Button type="primary" onClick={handleClear} danger> Clear </Button>
        <Button type="primary" htmlType="submit" style={{paddingRight:"10px"}}> Submit </Button>
      </div>

      {props.addUser_error && props.addUser_error.message && (
        <Alert style={{marginTop:"10px"}} message={props.addUser_error.message} type="error" showIcon/>
      )}

    </Form>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  addUser_inProgress: addUser_inProgress(),
  addUser_error: addUser_error(),
  addUser_result: addUser_result(),
  getUsers_inProgress: getUsers_inProgress(),
});

const mapDispatchToProps = (dispatch) => ({
  
  doAddUser: (payload,callback) => {
    dispatch(doAddUser(payload,callback));
  },

  doGetUsers: () => {
    dispatch(doGetUsers());
  },

  doAddUserFailed: (payload) => {
    dispatch(doAddUserFailed(payload));
  },

  doUpdateUser: (payload,callback) => {
    dispatch(doUpdateUser(payload,callback));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddUser);