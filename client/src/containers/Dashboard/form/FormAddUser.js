import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Space 
} from 'antd';
import React, { useState } from 'react';
import FileBase from "react-file-base64";
import { connect } from "react-redux";
import { doAddUser,doAddUserFailed } from "../actions/addUserAction";
import { createStructuredSelector } from "reselect";
import { Spin } from "antd";
import {
  addUser_error,
  addUser_inProgress,
  addUser_result
} from "../selectors/addUserSelector";

import ModalComponent from '../../../components/modal/ModalComponent';
import { useNavigate } from 'react-router-dom';
import {doGetUsers,doGetUsersFailed} from "../actions/getUsersAction"

const dateFormat = 'YYYY/MM/DD';

const FormAddUser = (props) => {

  const[postData,setPostData] = useState({
    userName:'',userEmail:'',occupation:'',NIC:'',gender:'',address:'',
    dateOfBirth: '',mobileNumber:'',userImage:''
  })

  const navigate = useNavigate();

  // console.log(postData)

  const navigateHandler = () => navigate("/");

  const handleSubmit = () => {
    props.doAddUser(postData);
    props.doGetUsers();
  }

  return (
    <>
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        remember: true,
      }}
      size="default"
      onFinish={handleSubmit}
      
    >

      <Form.Item label="Name">
        <Input value={postData.userName} onChange={(e) => setPostData({ ...postData,userName: e.target.value })}/>
      </Form.Item>

      <Form.Item label="Email">
        <Input value={postData.userEmail} onChange={(e) => setPostData({ ...postData,userEmail: e.target.value })}/>
      </Form.Item>

      <Form.Item label="Address">
        <Input value={postData.address} onChange={(e) => setPostData({ ...postData,address: e.target.value })}/>
      </Form.Item>

      <Form.Item label="NIC">
        <Input value={postData.NIC} onChange={(e) => setPostData({ ...postData,NIC: e.target.value })}/>
      </Form.Item>

      <Form.Item label="Occupation">
        <Input value={postData.occupation} onChange={(e) => setPostData({ ...postData,occupation: e.target.value })}/>
      </Form.Item>

      <Form.Item label="Mobile">
        <Input value={postData.mobileNumber} onChange={(e) => setPostData({ ...postData,mobileNumber: e.target.value })}/>
      </Form.Item>

      <Form.Item label="Gender">
        <Input value={postData.gender} onChange={(e) => setPostData({ ...postData,gender: e.target.value })}/>
      </Form.Item>

      <Form.Item label="DoB">
        {/* <Input value={postData.dateOfBirth} onChange={(e) => setPostData({ ...postData,dateOfBirth: e.target.value })}/> */}
        <DatePicker onChange={(_,dateString) => setPostData({ ...postData,dateOfBirth: dateString })} />
      </Form.Item>

      <Form.Item label="Image">
      <FileBase
        type="file"
        multiple={false}
        onDone={({base64}) => setPostData({ ...postData,userImage:base64})}
      />

      </Form.Item>

      <Button> Clear </Button>
      <Button htmlType="submit"> Submit </Button>
      

    </Form>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  addUser_inProgress: addUser_inProgress(),
  addUser_error: addUser_error(),
  addUser_result: addUser_result(),
});

const mapDispatchToProps = (dispatch) => ({
  
  doAddUser: (payload) => {
    dispatch(doAddUser(payload));
  },

  doGetUsers: () => {
    dispatch(doGetUsers());
  },

  // doLoginFailed: (payload) => {
  //   dispatch(doLoginFailed(payload));
  // },

});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddUser);